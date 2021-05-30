using AutoMapper;
using MonumentsMap.Application.Dto.Common;
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
