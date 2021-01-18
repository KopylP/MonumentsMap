using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Domain.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Application.Services.Monuments
{
    public interface IStatusService : ILocalizedRestService<LocalizedStatusDto, EditableLocalizedStatusDto>
    {
    }
}
