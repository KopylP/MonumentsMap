using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiVersion("1.0")]
    public class ConditionController : LocalizedController<IConditionService, LocalizedConditionDto, EditableLocalizedConditionDto, ConditionRequestFilterDto>
    {
        public ConditionController(IConditionService localizedRestService) : base(localizedRestService)
        {
        }
    }
}