using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    [ApiVersion("1.0")]
    public class StatusController : LocalizedController<IStatusService, LocalizedStatusDto, EditableLocalizedStatusDto>
    {
        public StatusController(IStatusService localizedRestService) : base(localizedRestService)
        {
        }
    }
}