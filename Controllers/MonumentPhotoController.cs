using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class MonumentPhotoController : LocalizedController<MonumentPhotoLocalizedRepository, LocalizedMonumentPhoto, EditableLocalizedMonumentPhoto, MonumentPhoto>
    {
        private MonumentPhotoRepository _monumentPhotoRepository;
        public MonumentPhotoController(MonumentPhotoLocalizedRepository localizedRepository, MonumentPhotoRepository monumentPhotoRepository) : base(localizedRepository)
        {
            _monumentPhotoRepository = monumentPhotoRepository;
        }

        #region methods
        [HttpPatch("{id:int}/toogle/majorphoto")]
        public async Task<IActionResult> ToogleMajorPhoto([FromRoute] int id)
        {
            var monumentPhoto = await _monumentPhotoRepository.Get(id);
            if(monumentPhoto == null) return NotFound(); //TODO handle error
            monumentPhoto.MajorPhoto = !monumentPhoto.MajorPhoto;
            await _monumentPhotoRepository.Update(monumentPhoto);
            return Ok(monumentPhoto);
        }
        #endregion
    }
}