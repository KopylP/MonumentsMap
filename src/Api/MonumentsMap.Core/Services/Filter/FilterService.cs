using System;
using System.Threading.Tasks;
using MonumentsMap.Application.Dto.Filter;
using MonumentsMap.Application.Services.Filter;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Domain.Repository;

namespace MonumentsMap.Core.Services.Filter
{
    public class FilterService : IFilterService
    {
        private readonly IMonumentRepository _monumentRepository;
        private readonly IStatusService _statusService;
        private readonly IConditionService _conditionService;
        private readonly ICityService _cityService;

        public FilterService(IMonumentRepository monumentRepository, IStatusService statusService, IConditionService conditionService, ICityService cityService)
        {
            _monumentRepository = monumentRepository;
            _statusService = statusService;
            _conditionService = conditionService;
            _cityService = cityService;
        }

        public async Task<FilterResponseDto> GetAllAvailableFiltersAsync(string cultureCode)
        {
            return new FilterResponseDto
            {
                Statuses = (await _statusService.GetAsync(cultureCode, null)).Items,
                Conditions = (await _conditionService.GetAsync(cultureCode, null)).Items,
                Cities = (await _cityService.GetAsync(cultureCode, null)).Items,
                YearsRange = new int[] { await _monumentRepository.GetMinimumMonumentsYearAsync() - 10, DateTime.Now.Year }
            };
        }
    }
}
