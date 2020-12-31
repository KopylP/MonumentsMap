using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Application.Services.Monuments
{
    public interface ICityService : ILocalizedRestService<LocalizedCityDto, EditableLocalizedCityDto, City>
    {
    }
}
