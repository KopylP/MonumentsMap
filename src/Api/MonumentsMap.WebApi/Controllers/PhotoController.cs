using System;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Application.Dto.Photo;
using MonumentsMap.Data.Services;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/[controller]")]
    public class PhotoController : ControllerBase
    {
        private IPhotoRepository _photoRepository;
        private IPhotoService _photoService;

        public PhotoController(IPhotoRepository photoRepository, IPhotoService photoService)
        {
            _photoRepository = photoRepository;
            _photoService = photoService;
        }

        [HttpPost]
        [RequestSizeLimit(6_000_000)]
        public async Task<IActionResult> Post([FromForm] IFormFile file)
        {
            var photo = new Photo
            {
                FileName = file.FileName
            };
            await _photoRepository.Add(photo);
            await _photoRepository.SaveChangeAsync();
            try
            {
                photo.ImageScale = await _photoService.SavePhotoAsync(file, photo.Id.ToString());
                await _photoRepository.Update(photo);
                await _photoRepository.SaveChangeAsync();
            }
            catch
            {
                return StatusCode(500, new InternalServerError());
            }
            return Ok(photo.Adapt<PhotoDto>());
        }

        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetImageAsync(int id, [FromQuery] bool base64 = false)
        {
            var photo = await _photoRepository.Get(id);
            try
            {
                var (fileType, image) = _photoService.FetchImage(photo.Id.ToString(), photo.FileName);
                if (base64)
                {
                    byte[] imageBytes = new byte[image.Length];
                    await image.ReadAsync(imageBytes, 0, (int)image.Length);
                    return Ok(new { image = "data:image/png;base64," + Convert.ToBase64String(imageBytes) });
                }

                return File(image, fileType);
            }
            catch
            {
                return StatusCode(500, new InternalServerError());
            }
        }

        [HttpGet("{id}/image/{size}")]
        public async Task<IActionResult> GetImageAsync(int id, int size, [FromQuery] bool base64 = false)
        {

            var photo = await _photoRepository.Get(id);
            if (photo == null)
                return NotFound(new NotFoundError("Monument photo model not found"));
            try
            {
                if (base64)
                {
                    return Ok(new { image = await _photoService.GetImageThumbnailBase64(photo.Id.ToString(), photo.FileName, size) });
                }
                else
                {
                    return File(await _photoService.GetImageThumbnail(photo.Id.ToString(), photo.FileName, size), "image/jpeg");
                }
            }
            catch
            {
                return StatusCode(500, new InternalServerError());
            }
        }
    }
}