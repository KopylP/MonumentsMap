using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;

namespace MonumentsMap.Controllers
{
    public class ConditionController : LocalizedController<IConditionService, LocalizedConditionDto, EditableLocalizedConditionDto>
    {
        public ConditionController(IConditionService localizedRestService) : base(localizedRestService)
        {
        }
    }
}