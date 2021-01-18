using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Domain.Models;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments;
using MonumentsMap.Domain.FilterParameters;

namespace MonumentsMap.Application.Services.Monuments
{
    public interface IMonumentService : ILocalizedRestService<LocalizedMonumentDto, EditableLocalizedMonumentDto>
    {
        Task<int> ToogleMonument(int monumentId);
        Task<int> EditMonumentParticipantsAsync(MonumentParticipantsDto monumentParticipantsViewModel);
        Task<IEnumerable<ParticipantDto>> GetRawParticipantsAsync(int monumentId);
        Task<IEnumerable<LocalizedParticipantDto>> GetLocalizedParticipants(int monumentId, string cultureCode);
        Task<LocalizedMonumentDto> GetMonumentBySlug(string slug, string cultureCode);
        Task<int> GetMonumentIdBySlug(string slug);
        Task<IEnumerable<LocalizedMonumentDto>> GetByFilterAsync(MonumentFilterParameters parameters);
        Task<IEnumerable<LocalizedMonumentDto>> GetAccepted(string cultureCode);
    }
}