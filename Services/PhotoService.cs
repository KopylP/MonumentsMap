using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace MonumentsMap.Services
{
    public class PhotoService
    {
        #region private fields
        private string _imagePath;
        private IHostEnvironment _env;
        #endregion

        #region constructor
        public PhotoService(IConfiguration configuration, IHostEnvironment env)
        {
            _imagePath = configuration["ImagesFolder"];
            _env = env;
        }
        #endregion

        #region public methods
        public async void SavePhotoAsync(IFormFile file, string subDir)
        {
            string dirPath = Path.Combine(_env.ContentRootPath, $"{_imagePath}{Path.DirectorySeparatorChar}{subDir}");
            DirectoryInfo dirInfo = new DirectoryInfo(dirPath);
            if(!dirInfo.Exists)
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
            string path = Path.Combine(_env.ContentRootPath, $"{_imagePath}{Path.DirectorySeparatorChar}{subDir}{Path.DirectorySeparatorChar}{fileName}");
            var imageStream = File.OpenRead(path);
            return ("image/jpeg", imageStream);
        }
        #endregion
    }
}