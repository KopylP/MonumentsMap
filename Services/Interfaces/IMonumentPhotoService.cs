using System.Threading.Tasks;
using MonumentsMap.Models;
using static MonumentsMap.Services.MonumentPhotoService;

namespace MonumentsMap.Services.Interfaces
{
    public interface IMonumentPhotoService
    {
        Task<MonumentPhoto> ToogleMajorPhotoAsync(int monumentPhotoId);
        Task<(MonumentPhoto monumentPhoto, RemoveStatus removeStatus)> Remove(int MonumentPhotoId);
    }
}