using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Contracts.Services
{
    public interface IMonumentService
    {
        Task<Monument> ToogleMajorPhotoAsync(int monumentId);
        Task<Monument> EditMonumentParticipantsAsync(MonumentParticipantsViewModel monumentParticipantsViewModel);
        Task<IEnumerable<Participant>> GetRawParticipantsAsync(int monumentId);
    }
}