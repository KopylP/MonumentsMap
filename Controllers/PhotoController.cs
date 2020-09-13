using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.Services;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhotoController : ControllerBase
    {
        #region private fields
        private PhotoRepository _photoRepository;
        private PhotoService _photoService;
        private ILogger<Startup> _logger;
        private IMemoryCache _cache;
        #endregion

        #region constructor
        public PhotoController(PhotoRepository photoRepository, PhotoService photoService, ILogger<Startup> logger, IMemoryCache cache)
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
                return StatusCode(500); //TODO Handle error
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
                return StatusCode(500); //TODO handle error
            }
        }
        [HttpGet("{id}/image/{size}")]
        public async Task<IActionResult> GetImageAsync(int id, int size)
        {
            byte[] image;
            var cacheKey = $"{id}{size}";
            if (!_cache.TryGetValue(cacheKey, out image))
            {
                var photo = await _photoRepository.Get(id);
                try
                {
                    var (fileType, imageStream) = _photoService.GetImageThumbnail(photo.Id.ToString(), photo.FileName, size);
                    image = new byte[imageStream.Length];
                    await imageStream.ReadAsync(image, 0, (int)imageStream.Length);
                    _cache.Set(cacheKey, image, TimeSpan.FromMinutes(10));
                }
                catch
                {
                    return StatusCode(500); //TODO handle error
                }
            }
            return File(image, "image/jpeg");
        }
        #endregion
    }
}