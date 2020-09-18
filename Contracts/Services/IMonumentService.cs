using System.Threading.Tasks;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Contracts.Services
{
    public interface IMonumentService
    {
        Task<Monument> ToogleMajorPhotoAsync(int monumentId);
    }
}