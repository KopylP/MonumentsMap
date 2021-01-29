using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using System.Threading.Tasks;
using System.Linq;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Contracts.Paging;
using MonumentsMap.Application.Dto.Monuments.Filters;
using AutoMapper;
using MonumentsMap.Domain.FilterParameters;

namespace MonumentsMap.Core.Services.Monuments
{
    public class CityService: ICityService
    {
        private readonly ICityRepository _cityRepository;
        private readonly IMapper _mapper;
        public CityService(ICityRepository cityRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(EditableLocalizedCityDto model)
        {
                var entity = model.CreateEntity();
                await _cityRepository.Add(entity);
                await _cityRepository.SaveChangeAsync();
                return entity.Id;
        }

        public async Task<int> EditAsync(EditableLocalizedCityDto model)
        {
                var city = await _cityRepository.Get(model.Id,
                    p => p.Name.Localizations);
                var entity = model.CreateEntity(city);
                await _cityRepository.Update(entity);

                await _cityRepository.SaveChangeAsync();

                return entity.Id;
        }

        public async Task<PagingList<LocalizedCityDto>> GetAsync(string cultureCode, CityRequestFilterDto filterDto)
        {
                filterDto ??= CityRequestFilterDto.Empty;    

                var filter = _mapper.Map<CityFilterParameters>(filterDto);
                var cities = await _cityRepository.Filter(filter, prop => prop.Name.Localizations);

                var result = (from city in cities.Items
                select new LocalizedCityDto
                {
                    Id = city.Id,
                    Name = city.Name.GetNameByCode(cultureCode)
                })
                .ToList();

                return new PagingList<LocalizedCityDto>(result, cities.PagingInformation);
        }

        public async Task<LocalizedCityDto> GetAsync(int id, string cultureCode)
        {
                var city = await _cityRepository.Get(id, p => p.Name.Localizations);

                return new LocalizedCityDto
                {
                    Id = city.Id,
                    Name = city.Name.GetNameByCode(cultureCode)
                };
        }

        public async Task<EditableLocalizedCityDto> GetEditable(int id)
        {
            var city = await _cityRepository.Get(id, p => p.Name.Localizations);

            return new EditableLocalizedCityDto
            {
                Id = city.Id,
                Name = city.Name.GetCultureValuePairs()
            };
        }

        public async Task<int> RemoveAsync(int id)
        {
                await _cityRepository.Delete(id);
                await _cityRepository.SaveChangeAsync();
                return id;
        }
    }
}
