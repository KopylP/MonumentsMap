using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using MonumentsMap.Api.Errors;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Data.Services;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhotoController : ControllerBase
    {
        #region private fields
        private IPhotoRepository _photoRepository;
        private PhotoService _photoService;
        private ILogger<Startup> _logger;
        private IMemoryCache _cache;
        #endregion

        #region constructor
        public PhotoController(IPhotoRepository photoRepository, PhotoService photoService, ILogger<Startup> logger, IMemoryCache cache)
        {
            _photoRepository = photoRepository;
            _photoService = photoService;
            _logger = logger;
            _cache = cache;
        }
        #endregion

        #region rest methods
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] IFormFile file)
        {
            var photo = new Photo
            {
                FileName = file.FileName
            };
            await _photoRepository.Add(photo);
            try
            {
                photo.ImageScale = await _photoService.SavePhotoAsync(file, photo.Id.ToString());
                await _photoRepository.Update(photo);
            }
            catch
            {
                return StatusCode(500, new InternalServerError());
            }
            return Ok(photo);
        }
        #endregion

        #region methods
        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetImageAsync(int id)
        {
            var photo = await _photoRepository.Get(id);
            try
            {
                var (fileType, image) = _photoService.FetchImage(photo.Id.ToString(), photo.FileName);
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
            byte[] image;

            var photo = await _photoRepository.Get(id);
            if(photo == null) 
                return NotFound(new NotFoundError("Monument photo model not found"));
            try
            {
                image = await  _photoService.GetImageThumbnail(photo.Id.ToString(), photo.FileName, size);
            }
            catch
            {
                return StatusCode(500, new InternalServerError());
            }

            if (base64) 
            {
                return Ok(new { image = "data:image/png;base64," + Convert.ToBase64String(image) });
            }

            return File(image, "image/jpeg");
        }
        #endregion
    }
}