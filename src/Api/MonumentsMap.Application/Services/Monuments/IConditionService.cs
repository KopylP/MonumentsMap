using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;

namespace MonumentsMap.Application.Services.Monuments
{
    public interface IConditionService : ILocalizedRestService<LocalizedConditionDto, EditableLocalizedConditionDto, ConditionRequestFilterDto>
    {
    }
}
