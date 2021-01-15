using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Controllers
{
    public class CityController : LocalizedController<ICityService, LocalizedCityDto, EditableLocalizedCityDto, City>
    {
        public CityController(ICityService localizedRestService) : base(localizedRestService)
        {
        }
    }
}
