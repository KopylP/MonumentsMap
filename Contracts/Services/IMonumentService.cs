using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels;

namespace MonumentsMap.Contracts.Services
{
    public interface IMonumentService
    {
        Task<Monument> ToogleMajorPhotoAsync(int monumentId);
        Task<Monument> EditMonumentParticipantsAsync(MonumentParticipantsViewModel monumentParticipantsViewModel);
        Task<IEnumerable<Participant>> GetRawParticipantsAsync(int monumentId);
        Task<IEnumerable<LocalizedParticipant>> GetLocalizedParticipants(int monumentId, string cultureCode);
        Task<LocalizedMonument> GetMonumentBySlug(string slug, string cultureCode);
        Task<Monument> GetMonumentBySlug(string slug);
    }
}