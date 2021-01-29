using AutoMapper;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Domain.FilterParameters;

namespace MonumentsMap.Core.Profiles
{
    class FiltersProfile : Profile
    {
        public FiltersProfile()
        {
            CreateMap<CityRequestFilterDto, CityFilterParameters>();
            CreateMap<ConditionRequestFilterDto, ConditionFilterParameters>();
            CreateMap<MonumentPhotoRequestFilterDto, MonumentPhotoFilterParameters>();
            CreateMap<MonumentRequestFilterDto, MonumentFilterParameters>();
            CreateMap<ParticipantRequestFilterDto, ParticipantFilterParameters>();
            CreateMap<StatusRequestFilterDto, StatusFilterParameters>();
        }
    }
}
