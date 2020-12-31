using Microsoft.EntityFrameworkCore;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MonumentsMap.Core.Extensions;
using MonumentsMap.Domain.Repository;

namespace MonumentsMap.Core.Services.Monuments
{
    public class CityService: ICityService
    {
        private ICityRepository _cityRepository;
        public CityService(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }

        public async Task<City> CreateAsync(EditableLocalizedCityDto model)
        {
                var entity = model.CreateEntity();
                await _cityRepository.Add(entity);
                await _cityRepository.SaveChangeAsync();
                return entity;
        }

        public async Task<City> EditAsync(EditableLocalizedCityDto model)
        {
                var city = await _cityRepository.Get(model.Id,
                    p => p.Name.Localizations);
                var entity = model.CreateEntity(city);
                await _cityRepository.Update(entity);

                await _cityRepository.SaveChangeAsync();

                return entity;
        }

        public async Task<IEnumerable<LocalizedCityDto>> GetAsync(string cultureCode)
        {
                var cities = _cityRepository.GetQuery();
                cities = cities.Include(prop => prop.Name.Localizations);

                var result = from city in cities
                select new LocalizedCityDto
                {
                    Id = city.Id,
                    Name = city.Name.GetNameByCode(cultureCode)
                };

                return await result.ToListAsync();
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
            var city = await _cityRepository.Get(id);

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
