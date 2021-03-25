using Microsoft.AspNetCore.Http;
using MonumentsMap.Application.Dto.Image;
using System.IO;
using System.Threading.Tasks;

namespace MonumentsMap.Data.Services
{
    public interface IImageService
    {
        Task<double> SaveImageAsync(IFormFile file, string subDir);
        Task<ImageResponseDto> FetchImageAsync(string subDir, string fileName);
        Task DeleteImageAsync(string subDir, string imageName);
        Task<ImageResponseDto> GetImageThumbnail(string subDir, string fileName, int resizeWidth);
    }
}