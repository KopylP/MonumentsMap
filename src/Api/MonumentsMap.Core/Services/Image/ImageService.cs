using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Hosting;
using MonumentsMap.Application.Dto.Image;
using MonumentsMap.Data.Services;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Framework.Settings;
using MonumentsMap.Framework.Utilities;

namespace MonumentsMap.Core.Services.Photo
{
    public class ImageService : IImageService
    {
        private ImageFilesParams _imageFilesParams;
        private IHostEnvironment _env;
        private IMemoryCache _cache;
        private IImageRepository _imageRepository; 

        public ImageService(ImageFilesParams imageFilesParams, IHostEnvironment env, IMemoryCache cache, IImageRepository imageRepository)
        {
            _env = env;
            _imageFilesParams = imageFilesParams;
            _cache = cache;
            _imageRepository = imageRepository;
        }

        public async Task<double> SaveImageAsync(IFormFile file, string subDir)
        {
            Image image = null;
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                await memoryStream.FlushAsync();

                image = new Image(subDir, file.FileName, memoryStream.ToArray());
                await _imageRepository.SaveImageAsync(image);
            }

            double imageScale;

            using (var memoryStream = new MemoryStream(image.ImageBytes))
            {
                imageScale = ImageUtility.GetImageScale(memoryStream);
            }

            return imageScale;
        }

        public async Task<ImageResponseDto> FetchImageAsync(string subDir, string fileName)
        {
            var image = await _imageRepository.GetImageAsync(subDir, fileName);
            return new ImageResponseDto
            {
                ImageBytes = image.ImageBytes
            };
        }

        public async Task DeleteImageAsync(string subDir, string imageName)
        {

            await _imageRepository.DeleteImageAsync(subDir, imageName);
        }

        public async Task<ImageResponseDto> GetImageThumbnail(string subDir, string fileName, int resizeWidth)
        {
            string path = Path.Combine(subDir, fileName);
            byte[] imageArray;
            string cacheKey = $"{path}{resizeWidth}";
            if (!_cache.TryGetValue(cacheKey, out imageArray))
            {
                var image = await _imageRepository.GetImageAsync(subDir, fileName);
                using (var stream = new MemoryStream(image.ImageBytes))
                {
                    using (var imageStream = ImageUtility.GetImageThumbnail(stream, resizeWidth))
                    {
                        imageArray = new byte[imageStream.Length];
                        await imageStream.ReadAsync(imageArray, 0, (int)imageStream.Length);
                    }
                }
            }
            return new ImageResponseDto
            {
                ImageBytes = imageArray
            };
        }
    }
}