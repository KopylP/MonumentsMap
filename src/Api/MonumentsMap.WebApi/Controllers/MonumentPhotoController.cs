using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Domain.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class MonumentPhotoController : LocalizedController<IMonumentPhotoService, LocalizedMonumentPhotoDto, EditableLocalizedMonumentPhotoDto, MonumentPhoto>
    {
        public MonumentPhotoController(IMonumentPhotoService localizedRestService) : base(localizedRestService)
        {
        }

        [HttpPatch("{id:int}/toogle/majorphoto")]
        public async Task<IActionResult> ToogleMajorPhoto([FromRoute] int id)
        {
            var monumentPhoto = await localizedRestService.ToogleMajorPhotoAsync(id);

            if (monumentPhoto == null)
                return NotFound(new NotFoundError("Monument photo not found"));
                
            return Ok(monumentPhoto);
        }
    }
}