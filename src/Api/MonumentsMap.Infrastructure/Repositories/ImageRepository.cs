using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Framework.Settings;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private ImageFilesParams _imageFilesParams;
        private IHostEnvironment _env;

        public ImageRepository(ImageFilesParams imageFilesParams, IHostEnvironment env)
        {
            _env = env;
            _imageFilesParams = imageFilesParams;
        }

        public async Task DeleteImageAsync(string path, string imageName)
        {
            DirectoryInfo dirInfo = new DirectoryInfo(GetDirPath(path));
            if (!dirInfo.Exists) throw new ArgumentException("Path does not exists");
            dirInfo.Delete(true);
            await Task.FromResult(new object());
        }

        public async Task<Image> GetImageAsync(string path, string imageName)
        {
            var fullPath = Path.Combine(GetDirPath(path), imageName);
            byte[] image = null;
            using (var stream = File.OpenRead(fullPath))
            {
                    image = new byte[stream.Length];
                    await stream.ReadAsync(image, 0, (int)stream.Length);
            }

            return new Image(path, imageName, image);
        }

        public async Task SaveImageAsync(Image file)
        {
            string dirPath = GetDirPath(file.ImagePath);
            DirectoryInfo dirInfo = new DirectoryInfo(dirPath);
            if (!dirInfo.Exists)
            {
                dirInfo.Create();
            }

            string filePath = Path.Combine(dirPath, file.ImageName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await fileStream.WriteAsync(file.ImageBytes);
                await fileStream.FlushAsync();
            }
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
    }
}