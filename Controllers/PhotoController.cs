using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        #endregion

        #region constructor
        public PhotoController(PhotoRepository photoRepository, PhotoService photoService, ILogger<Startup> logger)
        {
            _photoRepository = photoRepository;
            _photoService = photoService;
            _logger = logger;
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
                await _photoService.SavePhotoAsync(file, photo.Id.ToString());
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
            var photo = await _photoRepository.Get(id);
            try
            {
                var (fileType, imageStream) = _photoService.GetImageThumbnail(photo.Id.ToString(), photo.FileName, size);
                return File(imageStream, fileType);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.Message);
                return StatusCode(500); //TODO handle error
            }
        }
        #endregion
    }
}