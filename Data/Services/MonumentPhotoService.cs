using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MonumentsMap.Api.Exceptions;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Contracts.Services;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data.Services
{
    public class MonumentPhotoService : IMonumentPhotoService
    {
        #region private fields
        private readonly IMonumentPhotoRepository _monumentPhotoRepository;
        private readonly PhotoService _photoService;
        #endregion
        #region constructor
        public MonumentPhotoService(IMonumentPhotoRepository monumentPhotoRepository, PhotoService photoService)
        {
            _monumentPhotoRepository = monumentPhotoRepository;
            _photoService = photoService;
        }

        #endregion
        #region interface methods
        public async Task<MonumentPhoto> ToogleMajorPhotoAsync(int monumentPhotoId)
        {
            var monumentPhoto = await _monumentPhotoRepository.Get(monumentPhotoId);
            if (monumentPhoto == null) return null;
            var prevMonumentMajorPhoto = (await _monumentPhotoRepository
                .Find(p => p.MajorPhoto && p.Id != monumentPhotoId && p.MonumentId == monumentPhoto.MonumentId))
                .FirstOrDefault();
            _monumentPhotoRepository.Commit = false;
            if (prevMonumentMajorPhoto != null)
            {
                prevMonumentMajorPhoto.MajorPhoto = false;
                await _monumentPhotoRepository.Update(prevMonumentMajorPhoto);
            }
            monumentPhoto.MajorPhoto = !monumentPhoto.MajorPhoto;
            await _monumentPhotoRepository.Update(monumentPhoto);
            await _monumentPhotoRepository.SaveChangeAsync();
            _monumentPhotoRepository.Commit = true;
            return monumentPhoto;
        }
        public async Task<MonumentPhoto> Remove(int monumentPhotoId)
        {
            var monumentPhoto = await _monumentPhotoRepository.Delete(monumentPhotoId);
            if (monumentPhoto == null)
            {
                throw new NotFoundException("Monument photo not found");
            }
            try
            {
                _photoService.DeleteSubDir(monumentPhoto.PhotoId.ToString());
            }
            catch (IOException ex)
            {
                throw new InternalServerErrorException(ex.Message, ex);
            }
            return monumentPhoto;
        }
        #endregion
    }
}