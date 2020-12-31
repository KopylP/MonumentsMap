using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace MonumentsMap.Data.Services
{
    public interface IPhotoService
    {
        Task<double> SavePhotoAsync(IFormFile file, string subDir);
        (string fileType, FileStream image) FetchImage(string subDir, string fileName);
        bool DeleteSubDir(string subDir);
        Task<byte[]> GetImageThumbnail(string subDir, string fileName, int resizeWidth);

    }
}