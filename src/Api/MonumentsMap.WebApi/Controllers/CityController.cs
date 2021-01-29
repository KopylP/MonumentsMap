using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiVersion("1.0")]
    public class CityController : LocalizedController<ICityService, LocalizedCityDto, EditableLocalizedCityDto, CityRequestFilterDto>
    {
        public CityController(ICityService localizedRestService) : base(localizedRestService)
        {
        }
    }
}
