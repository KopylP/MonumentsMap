using AutoMapper;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Application.Dto.Photo;
using MonumentsMap.Core.Profiles.Converters;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Core.Profiles
{
    class PhotoProfile : Profile
    {
        public PhotoProfile(PhotoConverter photoConverter)
        {
            CreateMap<Photo, PhotoDto>()
                .ConvertUsing(photoConverter);
        }
    }
}
