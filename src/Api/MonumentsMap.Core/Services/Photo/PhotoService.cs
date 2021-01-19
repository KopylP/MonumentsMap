using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Hosting;
using MonumentsMap.Data.Services;
using MonumentsMap.Framework.Settings;
using MonumentsMap.Framework.Utilities;

namespace MonumentsMap.Core.Services.Photo
{
    public class PhotoService : IPhotoService
    {
        private ImageFilesParams _imageFilesParams;
        private IHostEnvironment _env;
        private IMemoryCache _cache;

        public PhotoService(ImageFilesParams imageFilesParams, IHostEnvironment env, IMemoryCache cache)
        {
            _env = env;
            _imageFilesParams = imageFilesParams;
            _cache = cache;
        }

        private string GetDirPath(string subDir)
        {
            string dirPath = _imageFilesParams.AbsolutePath switch
            {
                false => Path.Combine(_env.ContentRootPath, $"{_imageFilesParams.ImagesFolder}{Path.DirectorySeparatorChar}{subDir}"),
                true => Path.Combine(_imageFilesParams.ImagesFolder, subDir)
            };
            return dirPath;
        }

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

        public async Task<string> GetImageThumbnailBase64(string subDir, string fileName, int resizeWidth)
        {
            string dirPath = GetDirPath(subDir);
            string path = Path.Combine(dirPath, fileName);
            string imageBase64 = null;
           
            string cacheKey = $"{path}{resizeWidth}base64";
            if (!_cache.TryGetValue(cacheKey, out imageBase64))
            {
                byte[] image;
                using (var stream = File.OpenRead(path))
                {
                    using (var imageStream = ImageUtility.GetIamgeThumbnail(stream, resizeWidth))
                    {
                        image = new byte[imageStream.Length];
                        await imageStream.ReadAsync(image, 0, (int)imageStream.Length);
                    }
                }
                imageBase64 = "data:image/png;base64," + Convert.ToBase64String(image);
            }
            return imageBase64;
        }
    }
}