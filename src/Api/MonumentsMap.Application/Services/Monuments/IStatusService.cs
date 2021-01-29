using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Application.Services.Monuments
{
    public interface IStatusService : ILocalizedRestService<LocalizedStatusDto, EditableLocalizedStatusDto, StatusRequestFilterDto>
    {
    }
}
