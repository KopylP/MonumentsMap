using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MonumentsMap.POCO;

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

        #region public methods
        public void SavePhoto(IFormFile file, string subDir)
        {
            string dirPath = _imageFilesParams.AbsolutePath switch {
                false => Path.Combine(_env.ContentRootPath, $"{_imageFilesParams.ImagesFolder}{Path.DirectorySeparatorChar}{subDir}"),
                true => Path.Combine(_imageFilesParams.ImagesFolder, subDir)
            };
            DirectoryInfo dirInfo = new DirectoryInfo(dirPath);
            if(!dirInfo.Exists)
            {
                dirInfo.Create();
            }
            string filePath = Path.Combine(dirPath, file.FileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyToAsync(fileStream);
            }
        }

        public (string fileType, FileStream image) FetchImage(string subDir, string fileName) 
        {
            string dirPath = _imageFilesParams.AbsolutePath switch {
                false => Path.Combine(_env.ContentRootPath, $"{_imageFilesParams.ImagesFolder}{Path.DirectorySeparatorChar}{subDir}"),
                true => Path.Combine(_imageFilesParams.ImagesFolder, subDir)
            };
            string path = Path.Combine(dirPath, $"{fileName}");
            var imageStream = File.OpenRead(path);
            return ("image/jpeg", imageStream);
        }
        #endregion
    }
}