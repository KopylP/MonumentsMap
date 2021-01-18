using MonumentsMap.Application.Dto.Localized;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonumentsMap.Application.Services
{
    public interface ILocalizedRestService<TLocalized, TEditable>
        where TLocalized: BaseLocalizedDto
        where TEditable: BaseEditableLocalizedDto
    {
        Task<IEnumerable<TLocalized>> GetAsync(string cultureCode);
        Task<TLocalized> GetAsync(int id, string cultureCode);
        Task<TEditable> GetEditable(int id);
        Task<int> EditAsync(TEditable model);
        Task<int> CreateAsync(TEditable model);
        Task<int> RemoveAsync(int id);
    }
}
