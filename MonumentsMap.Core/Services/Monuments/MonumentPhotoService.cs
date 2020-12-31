using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using MonumentsMap.Application.Dto.Monuments;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Exceptions;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Core.Extensions;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Data.Services
{
    public class MonumentPhotoService : IMonumentPhotoService
    {
        private IPhotoService _photoService;
        private IMonumentPhotoRepository _monumentPhotoRepository;
        public MonumentPhotoService(IMonumentPhotoRepository monumentPhotoRepository, IPhotoService photoService)
        {
            _photoService = photoService;
            _monumentPhotoRepository = monumentPhotoRepository;
        }

        public async Task<MonumentPhoto> ToogleMajorPhotoAsync(int monumentPhotoId)
        {
            var monumentPhoto = await _monumentPhotoRepository.Get(monumentPhotoId);
            if (monumentPhoto == null) return null;
            var prevMonumentMajorPhoto = (await _monumentPhotoRepository
                .Find(p => p.MajorPhoto && p.Id != monumentPhotoId && p.MonumentId == monumentPhoto.MonumentId))
                .FirstOrDefault();
            if (prevMonumentMajorPhoto != null)
            {
                prevMonumentMajorPhoto.MajorPhoto = false;
                await _monumentPhotoRepository.Update(prevMonumentMajorPhoto);
            }

            monumentPhoto.MajorPhoto = !monumentPhoto.MajorPhoto;

            await _monumentPhotoRepository.Update(monumentPhoto);

            await _monumentPhotoRepository.SaveChangeAsync();

            return monumentPhoto;
        }

        public async Task<IEnumerable<LocalizedMonumentPhotoDto>> GetAsync(string cultureCode)
        {

            var localizedEntities = (await _monumentPhotoRepository.GetAll(
                p => p.Description.Localizations,
                p => p.Photo,
                p => p.Sources))
                .Select(p => LocalizeMonumentPhoto(p, cultureCode));

            return localizedEntities;
        }

        public async Task<LocalizedMonumentPhotoDto> GetAsync(int id, string cultureCode)
        {
            var monumentPhoto = await _monumentPhotoRepository.Get(id,
                p => p.Description.Localizations,
                p => p.Photo,
                p => p.Sources);

            if (monumentPhoto == null)
            {
                throw new NotFoundException("Monument Photo not found");
            }

            return LocalizeMonumentPhoto(monumentPhoto, cultureCode);
        }

        public async Task<EditableLocalizedMonumentPhotoDto> GetEditable(int id)
        {
            var entity = await _monumentPhotoRepository.Get(id,
                                p => p.Description.Localizations,
                                p => p.Photo,
                                p => p.Sources);

            if (entity == null)
            {
                throw new NotFoundException("Monument Photo not found");
            }

            return new EditableLocalizedMonumentPhotoDto
            {
                Id = entity.Id,
                Year = entity.Year,
                Period = entity.Period,
                MonumentId = entity.MonumentId,
                PhotoId = entity.PhotoId,
                Sources = entity.Sources.Select(p =>
                {
                    p.MonumentPhoto = null;
                    return p;
                }).ToList(),
                Description = entity.Description.GetCultureValuePairs()
            };
        }

        public async Task<MonumentPhoto> EditAsync(EditableLocalizedMonumentPhotoDto model)
        {
            var monumentPhoto = await _monumentPhotoRepository.Get(model.Id,
            p => p.Sources,
            p => p.Description.Localizations);

            var entity = model.CreateEntity(monumentPhoto);
            await _monumentPhotoRepository.Update(entity);

            await _monumentPhotoRepository.SaveChangeAsync();

            return entity;
        }

        public async Task<MonumentPhoto> CreateAsync(EditableLocalizedMonumentPhotoDto model)
        {
            var monumentPhoto = await _monumentPhotoRepository.Get(model.Id);
            var entity = model.CreateEntity(monumentPhoto);
            await _monumentPhotoRepository.Update(entity);

            await _monumentPhotoRepository.SaveChangeAsync();

            return entity;
        }

        public async Task<int> RemoveAsync(int monumentPhotoId)
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
            await _monumentPhotoRepository.SaveChangeAsync();

            return monumentPhotoId;
        }

        private LocalizedMonumentPhotoDto LocalizeMonumentPhoto(MonumentPhoto p, string cultureCode)
        {
            return new LocalizedMonumentPhotoDto
            {
                Id = p.Id,
                Year = p.Year,
                Period = p.Period,
                PhotoId = p.PhotoId,
                MonumentId = p.MonumentId,
                MajorPhoto = p.MajorPhoto,
                Sources = p.Sources.Adapt<SourceDto[]>().ToList(),
                Photo = p.Photo,
                Description = p.Description.GetNameByCode(cultureCode)
            };
        }

        public async Task<IEnumerable<LocalizedMonumentPhotoDto>> FindAsync(string cultureCode, Func<MonumentPhoto, bool> predicate)
        {
            var localizedEntities = (await _monumentPhotoRepository.Find(
                predicate,
                p => p.Description.Localizations,
                p => p.Photo,
                p => p.Sources))
                .Select(p => LocalizeMonumentPhoto(p, cultureCode));

            return localizedEntities;
        }
    }
}