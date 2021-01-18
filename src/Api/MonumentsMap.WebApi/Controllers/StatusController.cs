using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class StatusController : LocalizedController<IStatusService, LocalizedStatusDto, EditableLocalizedStatusDto>
    {
        public StatusController(IStatusService localizedRestService) : base(localizedRestService)
        {
        }
    }
}