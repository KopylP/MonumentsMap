using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    [ApiVersion("1.0")]
    public class ParticipantController : LocalizedController<IParticipantService, LocalizedParticipantDto, EditableLocalizedParticipantDto>
    {
        public ParticipantController(IParticipantService localizedRestService) : base(localizedRestService)
        {
        }
    }
}