using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MonumentsMap.POCO;
using MonumentsMap.Utilities;
using SkiaSharp;

namespace MonumentsMap.Services
{
    public class PhotoService
    {
        #region private fields
        private ImageFilesParams _imageFilesParams;
        private IHostEnvironment _env;
        private IMemoryCache _cache;
        #endregion

        #region constructor
        public PhotoService(ImageFilesParams imageFilesParams, IHostEnvironment env, IMemoryCache cache)
        {
            _env = env;
            _imageFilesParams = imageFilesParams;
            _cache = cache;
        }
        #endregion

        private string GetDirPath(string subDir)
        {
            string dirPath = _imageFilesParams.AbsolutePath switch
            {
                false => Path.Combine(_env.ContentRootPath, $"{_imageFilesParams.ImagesFolder}{Path.DirectorySeparatorChar}{subDir}"),
                true => Path.Combine(_imageFilesParams.ImagesFolder, subDir)
            };
            return dirPath;
        }

        #region public methods
        public async Task<double> SavePhotoAsync(IFormFile file, string subDir)
        {
            string dirPath = GetDirPath(subDir);
            DirectoryInfo dirInfo = new DirectoryInfo(dirPath);
            if (!dirInfo.Exists)
            {
                dirInfo.Create();
            }
            string filePath = Path.Combine(dirPath, file.FileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            using (var fileStream = File.OpenRead(filePath))
            {
                return ImageUtility.GetImageScale(fileStream);
            }
        }

        public (string fileType, FileStream image) FetchImage(string subDir, string fileName)
        {
            string dirPath = GetDirPath(subDir);
            string path = Path.Combine(dirPath, fileName);
            var imageStream = File.OpenRead(path);
            return ("image/jpeg", imageStream);
        }

        public bool DeleteSubDir(string subDir)
        {
            string dirPath = GetDirPath(subDir);
            DirectoryInfo dirInfo = new DirectoryInfo(dirPath);
            if (!dirInfo.Exists) return false;
            dirInfo.Delete(true);
            return true;
        }

        public async Task<byte[]> GetImageThumbnail(string subDir, string fileName, int resizeWidth)
        {
            string dirPath = GetDirPath(subDir);
            string path = Path.Combine(dirPath, fileName);
            byte[] image;
            string cacheKey = $"{path}{resizeWidth}";
            if (!_cache.TryGetValue(cacheKey, out image))
            {
                using (var stream = File.OpenRead(path))
                {
                    using (var imageStream = ImageUtility.GetIamgeThumbnail(stream, resizeWidth))
                    {
                        image = new byte[imageStream.Length];
                        await imageStream.ReadAsync(image, 0, (int)imageStream.Length);
                    }
                }
            }
            return image;
        }
        #endregion
    }
}