using AutoMapper;
using MonumentsMap.Application.Dto.Monuments;
using MonumentsMap.Core.Profiles.Converters;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Core.Profiles
{
    public class MonumentProfile : Profile
    {
        public MonumentProfile(MonumentPhotoConverter converter)
        {
            CreateMap<Source, SourceDto>();
            CreateMap<MonumentPhoto, MonumentPhotoDto>().ConvertUsing(converter);
        }
    }
}
