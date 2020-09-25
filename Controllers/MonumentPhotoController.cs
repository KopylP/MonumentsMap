using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Api.Exceptions;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Contracts.Services;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using static MonumentsMap.Data.Services.MonumentPhotoService;

namespace MonumentsMap.Controllers
{
    public class MonumentPhotoController : LocalizedController<IMonumentPhotoLocalizedRepository, LocalizedMonumentPhoto, EditableLocalizedMonumentPhoto, MonumentPhoto>
    {
        #region private fields
        private IMonumentPhotoService _monumentPhotoService;
        #endregion
        #region  constructor
        public MonumentPhotoController(
            IMonumentPhotoLocalizedRepository localizedRepository,
            IMonumentPhotoService monumentPhotoService
        ) : base(localizedRepository)
        {
            _monumentPhotoService = monumentPhotoService;
        }
        #endregion

        #region override methods
        [HttpDelete("{id}")]
        public override async Task<IActionResult> Delete(int id)
        {
            MonumentPhoto monumentPhoto;
            try
            {
                monumentPhoto = await _monumentPhotoService.Remove(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }
            return Ok(monumentPhoto);
        }
        #endregion

        #region methods
        [HttpPatch("{id:int}/toogle/majorphoto")]
        public async Task<IActionResult> ToogleMajorPhoto([FromRoute] int id)
        {
            var monumentPhoto = await _monumentPhotoService.ToogleMajorPhotoAsync(id);

            if (monumentPhoto == null)
                return NotFound(new NotFoundError("Monument photo not found"));
                
            return Ok(monumentPhoto);
        }
        #endregion
    }
}