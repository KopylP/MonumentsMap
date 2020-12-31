using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Domain.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class StatusController : LocalizedController<IStatusService, LocalizedStatusDto, EditableLocalizedStatusDto, Status>
    {
        public StatusController(IStatusService localizedRestService) : base(localizedRestService)
        {
        }
    }
}