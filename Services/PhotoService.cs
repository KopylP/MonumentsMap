using System.IO;
using Microsoft.AspNetCore.Http;
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
        #endregion

        #region constructor
        public PhotoService(ImageFilesParams imageFilesParams, IHostEnvironment env)
        {
            _env = env;
            _imageFilesParams = imageFilesParams;
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
        public async System.Threading.Tasks.Task SavePhotoAsync(IFormFile file, string subDir)
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

        public (string fileType, Stream image) GetImageThumbnail(string subDir, string fileName, int resizeWidth)
        {
            string dirPath = GetDirPath(subDir);
            string path = Path.Combine(dirPath, fileName);
            var stream = File.OpenRead(path);
            var image = ImageUtility.GetIamgeThumbnail(stream, resizeWidth);
            return ("image/jpeg", image);
        }
        #endregion
    }
}