using MonumentsMap.Application.Dto.Localized;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Contracts.Paging;
using System.Threading.Tasks;

namespace MonumentsMap.Application.Services
{
    public interface ILocalizedRestService<TLocalized, TEditable, TFilter>
        where TLocalized: BaseLocalizedDto
        where TEditable: BaseEditableLocalizedDto
        where TFilter: BaseRequestFilterDto
    {
        Task<PagingList<TLocalized>> GetAsync(string cultureCode, TFilter filter);
        Task<TLocalized> GetAsync(int id, string cultureCode);
        Task<TEditable> GetEditable(int id);
        Task<int> EditAsync(TEditable model);
        Task<int> CreateAsync(TEditable model);
        Task<int> RemoveAsync(int id);
    }
}
