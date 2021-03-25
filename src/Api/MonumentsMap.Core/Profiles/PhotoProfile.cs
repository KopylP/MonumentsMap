using AutoMapper;
using MonumentsMap.Application.Dto.Photo;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Core.Profiles
{
    class PhotoProfile : Profile
    {
        public PhotoProfile()
        {
            CreateMap<Photo, PhotoDto>();
        }
    }
}
