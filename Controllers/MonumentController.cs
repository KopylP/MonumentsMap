using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class MonumentController : LocalizedController<MonumentLocalizedRepository, LocalizedMonument, EditableLocalizedMonument, Monument>
    {
        #region private fields
        private readonly MonumentPhotoLocalizedRepository _monumentPhotoLocalizedRepository;
        #endregion
        #region constructor
        public MonumentController(MonumentLocalizedRepository localizedRepository, MonumentPhotoLocalizedRepository monumentPhotoLocalizedRepository) : base(localizedRepository)
        {
            _monumentPhotoLocalizedRepository = monumentPhotoLocalizedRepository;
        }
        #endregion

        #region metods
        [HttpGet("filter")]
        public async Task<IActionResult> Get
        (
            [FromQuery(Name = "statuses[]")] int[] statuses,
            [FromQuery(Name = "conditions[]")] int[] conditions,
            [FromQuery(Name = "cities[]")] int[] cities,
            [FromQuery] string cultureCode = "uk-UA"
        )
        {

            var monuments = await localizedRepository
                .Find(cultureCode,
                    p => (statuses.Length == 0 || statuses.Contains(p.StatusId))
                    && (conditions.Length == 0 || conditions.Contains(p.ConditionId))
                    && (cities.Length == 0 || cities.Contains(p.CityId)));
            return Ok(monuments);
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