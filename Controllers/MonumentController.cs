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
        public MonumentController(MonumentLocalizedRepository localizedRepository,
            MonumentPhotoLocalizedRepository monumentPhotoLocalizedRepository) : base(localizedRepository)
        {
            _monumentPhotoLocalizedRepository = monumentPhotoLocalizedRepository;
        }

        #region methods
        [HttpGet("{id}/photo/ids")]
        public async Task<IActionResult> GetPhotoIds(int id)
        {
            var monument = await localizedRepository.Find("uk-UA", p => p.Id == id);
            if(!monument.Any()) return NotFound(); //TODO handle errors
            var monumentPhotos = await _monumentPhotoLocalizedRepository.Find("uk-UA", p => p.MonumentId == id);
            if(monumentPhotos == null)
            {
                return NotFound(); //TODO handle errors
            }
            return Ok(monumentPhotos.Select(p => p.PhotoId));
        }
        #endregion
    }
}