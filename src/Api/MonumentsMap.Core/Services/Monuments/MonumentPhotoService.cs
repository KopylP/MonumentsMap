using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Mapster;
using MonumentsMap.Application.Dto.Monuments;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Dto.Photo;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.Paging;
using MonumentsMap.Data.Services;
using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Core.Services.Monuments
{
    public class MonumentPhotoService : IMonumentPhotoService
    {
        private readonly IImageService _imageService;
        private readonly IMonumentPhotoRepository _monumentPhotoRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoRepository _photoRepository;
        public MonumentPhotoService(IMonumentPhotoRepository monumentPhotoRepository, IImageService imageService, IMapper mapper, IPhotoRepository photoRepository)
        {
            _imageService = imageService;
            _monumentPhotoRepository = monumentPhotoRepository;
            _mapper = mapper;
            _photoRepository = photoRepository;
        }

        public async Task<int> ToogleMajorPhotoAsync(int monumentPhotoId)
        {
            var monumentPhoto = await _monumentPhotoRepository.Get(monumentPhotoId);
            if (monumentPhoto == null)
            {
                throw new NotFoundException("Monument Photo not found");
            }
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

            return monumentPhoto.Id;
        }

        public async Task<PagingList<LocalizedMonumentPhotoDto>> GetAsync(string cultureCode, MonumentPhotoRequestFilterDto filterDto)
        {
            filterDto ??= MonumentPhotoRequestFilterDto.Empty;

            var filter = _mapper.Map<MonumentPhotoFilterParameters>(filterDto);

            var entitiesPagingList = (await _monumentPhotoRepository.Filter(filter,
                p => p.Description.Localizations,
                p => p.Photo,
                p => p.Sources));

            var localizedEntities = entitiesPagingList.Items.Select(p => LocalizeMonumentPhoto(p, cultureCode)).ToList();

            return new PagingList<LocalizedMonumentPhotoDto>(localizedEntities, entitiesPagingList.PagingInformation);
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
                Sources = entity.Sources.Adapt<SourceDto[]>().ToList(),
                Description = entity.Description.GetCultureValuePairs()
            };
        }

        public async Task<int> EditAsync(EditableLocalizedMonumentPhotoDto model)
        {
            var monumentPhoto = await _monumentPhotoRepository.Get(model.Id,
            p => p.Sources,
            p => p.Description.Localizations);

            var entity = model.CreateEntity(monumentPhoto);
            await _monumentPhotoRepository.Update(entity);

            await _monumentPhotoRepository.SaveChangeAsync();

            return entity.Id;
        }

        public async Task<int> CreateAsync(EditableLocalizedMonumentPhotoDto model)
        {
            var entity = model.CreateEntity();
            await _monumentPhotoRepository.Add(entity);

            await _monumentPhotoRepository.SaveChangeAsync();

            return entity.Id;
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
                var photo = await _photoRepository.Get(monumentPhoto.PhotoId);
                await _imageService.DeleteImageAsync(monumentPhoto.PhotoId.ToString(), photo.FileName);
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
                Photo = p.Photo.Adapt<PhotoDto>(),
                Description = p.Description.GetNameByCode(cultureCode)
            };
        }

        public async Task<IEnumerable<LocalizedMonumentPhotoDto>> FindAsync(string cultureCode, Expression<Func<MonumentPhoto, bool>> predicate)
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