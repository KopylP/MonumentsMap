using System.Threading.Tasks;
using MonumentsMap.Entities.Models;
using static MonumentsMap.Data.Services.MonumentPhotoService;

namespace MonumentsMap.Contracts.Services
{
    public interface IMonumentPhotoService
    {
        Task<MonumentPhoto> ToogleMajorPhotoAsync(int monumentPhotoId);
        Task<MonumentPhoto> Remove(int MonumentPhotoId);
    }
}