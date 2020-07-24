using System.Linq;
using System.Threading.Tasks;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.Services.Interfaces;

namespace MonumentsMap.Services
{
    public class MonumentPhotoService : IMonumentPhotoService
    {
        #region private fields
        private MonumentPhotoRepository _monumentPhotoRepository;
        #endregion
        #region constructor
        public MonumentPhotoService(MonumentPhotoRepository monumentPhotoRepository) => _monumentPhotoRepository = monumentPhotoRepository;
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
            if(prevMonumentMajorPhoto != null)
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
        #endregion
    }
}