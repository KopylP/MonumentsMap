using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        #endregion

        #region constructor
        public PhotoController(PhotoRepository photoRepository, PhotoService photoService)
        {
            _photoRepository = photoRepository;
            _photoService = photoService;
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
            _photoService.SavePhotoAsync(file, photo.Id.ToString());
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
        #endregion
    }
}