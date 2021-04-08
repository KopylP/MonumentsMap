using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Services.Photo;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.WebApi.Framework.ResponseBuilders;
using static MonumentsMap.WebApi.Framework.ResponseBuilders.ImageResultBuilder;
using MonumentsMap.Framework.Converters.Image;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Route("api/[controller]")]
    public class PhotoController : BaseController
    {
        private IPhotoService _photoService;
        private IImageConverter _imageConverter;

        public PhotoController(IPhotoService photoService, IImageConverter imageConverter)
        {
            _photoService = photoService;
            _imageConverter = imageConverter;
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
        public async Task<IActionResult> GetImageAsync(int id, [FromQuery] bool base64 = false, [FromQuery] bool webp = false)
        {
            try
            {
                var image = await _photoService.GetPhotoImageAsync(id);

                return ImageResultBuilder
                    .Create(image, _imageConverter)
                    .WithImageFormat(ImageFormat.JPEG)
                    .ConvertToWebP(webp)
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
        public async Task<IActionResult> GetImageAsync(int id, int size, [FromQuery] bool base64 = false, [FromQuery] bool webp = false)
        {

            try
            {
                var image = await _photoService.GetPhotoImageThumbnailAsync(id, size);

                return ImageResultBuilder
                    .Create(image, _imageConverter)
                    .WithImageFormat(ImageFormat.JPEG)
                    .ConvertToWebP(webp)
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