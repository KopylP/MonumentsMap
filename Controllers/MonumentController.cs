using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Filters;
using MonumentsMap.Models;
using MonumentsMap.Services;
using MonumentsMap.Services.Interfaces;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class MonumentController : LocalizedController<MonumentLocalizedRepository, LocalizedMonument, EditableLocalizedMonument, Monument>
    {
        #region private fields
        private readonly MonumentPhotoLocalizedRepository _monumentPhotoLocalizedRepository;
        private readonly IMonumentService _monumentService;
        #endregion
        #region constructor
        public MonumentController(
            MonumentLocalizedRepository localizedRepository,
            MonumentPhotoLocalizedRepository monumentPhotoLocalizedRepository,
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
            var monuments = await localizedRepository.GetFilteredLocalizedMonumentsAsync(
                statuses, 
                conditions, 
                cities, 
                startYear, 
                endYear, 
                cultureCode
            );
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