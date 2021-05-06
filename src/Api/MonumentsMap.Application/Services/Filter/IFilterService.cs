using System;
using System.Threading.Tasks;
using MonumentsMap.Application.Dto.Filter;

namespace MonumentsMap.Application.Services.Filter
{
    public interface IFilterService
    {
        Task<FilterResponseDto> GetAllAvailableFiltersAsync(string cultureCode);
    }
}
