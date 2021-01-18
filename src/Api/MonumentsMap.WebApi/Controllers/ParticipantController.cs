using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class ParticipantController : LocalizedController<IParticipantService, LocalizedParticipantDto, EditableLocalizedParticipantDto>
    {
        public ParticipantController(IParticipantService localizedRestService) : base(localizedRestService)
        {
        }
    }
}