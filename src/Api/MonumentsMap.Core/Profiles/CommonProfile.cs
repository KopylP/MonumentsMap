using AutoMapper;
using MonumentsMap.Application.Dto.Common;
using MonumentsMap.Application.Dto.Monuments;
using MonumentsMap.Domain.Models.Common;

namespace MonumentsMap.Core.Profiles
{
    public class CommonProfile : Profile
    {
        public CommonProfile()
        {
            CreateMap<GeoPointDto, GeoPoint>();
        }
    }
}
