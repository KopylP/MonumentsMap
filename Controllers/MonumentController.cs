using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Contracts.Services;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.FilterParameters;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Filters;

namespace MonumentsMap.Controllers
{
    public class MonumentController : LocalizedController<IMonumentLocalizedRepository, LocalizedMonument, EditableLocalizedMonument, Monument>
    {
        #region private fields
        private readonly IMonumentPhotoLocalizedRepository _monumentPhotoLocalizedRepository;
        private readonly IMonumentService _monumentService;
        #endregion
        #region constructor
        public MonumentController(
            IMonumentLocalizedRepository localizedRepository,
            IMonumentPhotoLocalizedRepository monumentPhotoLocalizedRepository,
            IMonumentService monumentService
        ) : base(localizedRepository)
        {
            _monumentPhotoLocalizedRepository = monumentPhotoLocalizedRepository;
            _monumentService = monumentService;
        }
        #endregion

        #region metods
        [HttpGet("filter")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> Get(
            [FromQuery(Name = "statuses[]")] int[] statuses,
            [FromQuery(Name = "conditions[]")] int[] conditions,
            [FromQuery(Name = "cities[]")] int[] cities,
            [FromQuery] int? startYear,
            [FromQuery] int? endYear,
            [FromQuery] string cultureCode
        )
        {
            var monumentFilterParams = new MonumentFilterParameters
            {
                Statuses = statuses,
                Conditions = conditions,
                Cities = cities,
                StartYear = startYear,
                EndYear = endYear,
                CultureCode = cultureCode
            };
            var monuments = await localizedRepository.GetByFilterAsync(monumentFilterParams);
            return Ok(monuments);
        }

        [HttpPatch("{id:int}/toogle/accepted")]
        public async Task<IActionResult> ToogleAccepted(int id)
        {
            var monument = await _monumentService.ToogleMajorPhotoAsync(id);
            if (monument == null) return NotFound();//TODO handle error
            return Ok(monument);
        }

        [HttpGet("{id:int}/monumentPhotos")]
        public async Task<IActionResult> MonumentPhotos(int id, [FromQuery] string cultureCode = "uk-UA")
        {
            var monumentPhotos = await _monumentPhotoLocalizedRepository.Find(cultureCode, p => p.MonumentId == id);
            return Ok(monumentPhotos);
        }
        #endregion
    }
}