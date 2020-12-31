using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Controllers
{
    public class ConditionController : LocalizedController<IConditionService, LocalizedConditionDto, EditableLocalizedConditionDto, Condition>
    {
        public ConditionController(IConditionService localizedRestService) : base(localizedRestService)
        {
        }
    }
}