using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Services.Photo;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.WebApi.Framework.ResponseBuilders;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Route("api/[controller]")]
    public class PhotoController : BaseController
    {
        private IPhotoService _photoService;

        public PhotoController(IPhotoService photoService)
        {
            _photoService = photoService;
        }

        [HttpPost]
        [RequestSizeLimit(6_000_000)]
        public async Task<IActionResult> Post([FromForm] IFormFile file)
        {
            try
            {
                return Ok(await _photoService.SavePhoto(file));
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
            }
        }

        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetImageAsync(int id, [FromQuery] bool base64 = false)
        {
            try
            {
                var image = await _photoService.GetPhotoImageAsync(id);

                return ImageResultBuilder
                    .Create(image)
                    .WithStandartImage()
                    .UseBase64(base64)
                    .Build();
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
            }
        }

        [HttpGet("{id}/image/{size}")]
        public async Task<IActionResult> GetImageAsync(int id, int size, [FromQuery] bool base64 = false)
        {

            try
            {
                var image = await _photoService.GetPhotoImageThumbnailAsync(id, size);

                return ImageResultBuilder
                    .Create(image)
                    .WithStandartImage()
                    .UseBase64(base64)
                    .Build();
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
            }
        }
    }
}