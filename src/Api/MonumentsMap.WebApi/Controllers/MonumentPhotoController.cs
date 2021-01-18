using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Exceptions;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class MonumentPhotoController : LocalizedController<IMonumentPhotoService, LocalizedMonumentPhotoDto, EditableLocalizedMonumentPhotoDto>
    {
        public MonumentPhotoController(IMonumentPhotoService localizedRestService) : base(localizedRestService)
        {
        }

        [HttpPatch("{id:int}/toogle/majorphoto")]
        public async Task<IActionResult> ToogleMajorPhoto([FromRoute] int id)
        {
            int monumentPhotoId;
            try
            {
                monumentPhotoId = await localizedRestService.ToogleMajorPhotoAsync(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
                
            return Ok(monumentPhotoId);
        }
    }
}