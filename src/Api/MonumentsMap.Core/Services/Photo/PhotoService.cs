using AutoMapper;
using Microsoft.AspNetCore.Http;
using MonumentsMap.Application.Dto.Image;
using MonumentsMap.Application.Dto.Photo;
using MonumentsMap.Application.Services.Photo;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Data.Services;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.UnitOfWork;
using System.Threading.Tasks;

namespace MonumentsMap.Core.Services.Photo
{
    class PhotoService : IPhotoService
    {
        private readonly IPhotoRepository _photoRepository;
        private readonly IImageService _photoService;
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;

        public PhotoService(IPhotoRepository photoRepository, IImageService photoService, IMapper mapper, UnitOfWork unitOfWork)
        {
            _photoRepository = photoRepository;
            _photoService = photoService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<ImageResponseDto> GetPhotoImageAsync(int photoId)
        {
            var photo = await _photoRepository.Get(photoId);

            if (photo == null)
                throw new NotFoundException("Photo not found");

            try
            {
                return await _photoService.FetchImageAsync(photo.Id.ToString(), photo.FileName);
            }
            catch
            {
                throw new InternalServerErrorException();
            }

        }

        public async Task<ImageResponseDto> GetPhotoImageThumbnailAsync(int photoId, int size)
        {
            var photo = await _photoRepository.Get(photoId);

            if (photo == null)
                throw new NotFoundException("Photo not found");

            try
            {
                return await _photoService.GetImageThumbnail(photo.Id.ToString(), photo.FileName, size);
            }
            catch
            {
                throw new InternalServerErrorException();
            }
        }

        public async Task<PhotoDto> SavePhoto(IFormFile file)
        {
            Domain.Models.Photo photo = null;
            using (var transaction = _unitOfWork.BeginTransaction())
            {
                photo = new Domain.Models.Photo
                {
                    FileName = file.FileName
                };

                await _photoRepository.Add(photo);
                await _photoRepository.SaveChangeAsync();

                try
                {
                    photo.ImageScale = await _photoService.SaveImageAsync(file, photo.Id.ToString());
                    await _photoRepository.Update(photo);
                    await _photoRepository.SaveChangeAsync();
                }
                catch
                {
                    await transaction.RollbackAsync();

                    throw new InternalServerErrorException();
                }

                await transaction.CommitAsync();
            }

            return _mapper.Map<PhotoDto>(photo);
        }
    }
}
