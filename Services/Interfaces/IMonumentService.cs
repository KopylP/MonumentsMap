using System.Threading.Tasks;
using MonumentsMap.Models;

namespace MonumentsMap.Services.Interfaces
{
    public interface IMonumentService
    {
         Task<Monument> ToogleMajorPhotoAsync(int monumentId);
    }
}