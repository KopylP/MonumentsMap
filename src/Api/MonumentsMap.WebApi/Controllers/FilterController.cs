using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Application.Services.Filter;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class FilterController : BaseCultureController
    {
        private readonly IFilterService _filterService;

        public FilterController(IFilterService filterService, IConfiguration configuration) : base(configuration)
        {
            _filterService = filterService;
        }

        [HttpGet]
        public async virtual Task<IActionResult> Get([FromQuery] string cultureCode)
        {
            cultureCode = SafetyGetCulture(cultureCode);

            var result = await _filterService.GetAllAvailableFiltersAsync(cultureCode);
            return Ok(result);
        }
    }
}
