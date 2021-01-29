using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiVersion("1.0")]
    public class StatusController : LocalizedController<IStatusService, LocalizedStatusDto, EditableLocalizedStatusDto, StatusRequestFilterDto>
    {
        public StatusController(IStatusService localizedRestService) : base(localizedRestService)
        {
        }
    }
}