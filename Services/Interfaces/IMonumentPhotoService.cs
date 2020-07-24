using System.Threading.Tasks;
using MonumentsMap.Models;

namespace MonumentsMap.Services.Interfaces
{
    public interface IMonumentPhotoService
    {
        Task<MonumentPhoto> ToogleMajorPhotoAsync(int monumentPhotoId);
    }
}