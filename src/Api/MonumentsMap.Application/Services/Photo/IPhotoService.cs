using Microsoft.AspNetCore.Http;
using MonumentsMap.Application.Dto.Image;
using MonumentsMap.Application.Dto.Photo;
using System.Threading.Tasks;

namespace MonumentsMap.Application.Services.Photo
{
    public interface IPhotoService
    {
        Task<ImageResponseDto> GetPhotoImageAsync(int photoId);
        Task<ImageResponseDto> GetPhotoImageThumbnailAsync(int photoId, int size);
        Task<PhotoDto> SavePhoto(IFormFile file);
    }
}
