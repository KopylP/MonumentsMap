using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.Services.Interfaces;

namespace MonumentsMap.Services
{
    public class MonumentPhotoService : IMonumentPhotoService
    {

        #region enums
        public enum RemoveStatus
        {
            ModelNotFound,
            FileDeleteFail,
            Ok
        }
        #endregion

        #region private fields
        private readonly MonumentPhotoRepository _monumentPhotoRepository;
        private readonly PhotoService _photoService;
        #endregion
        #region constructor
        public MonumentPhotoService(MonumentPhotoRepository monumentPhotoRepository, PhotoService photoService)
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
                .Find(p => p.MajorPhoto && p.Id != monumentPhotoId))
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
        public async Task<(MonumentPhoto monumentPhoto, RemoveStatus removeStatus)> Remove(int monumentPhotoId)
        {
            var monumentPhoto = await _monumentPhotoRepository.Delete(monumentPhotoId);
            if (monumentPhoto == null) return (monumentPhoto, RemoveStatus.ModelNotFound);
            try
            {
                _photoService.DeleteSubDir(monumentPhoto.PhotoId.ToString());
            }
            catch (IOException)
            {
                return (null, RemoveStatus.FileDeleteFail);
            }
            return (monumentPhoto, RemoveStatus.Ok);
        }
        #endregion
    }
}