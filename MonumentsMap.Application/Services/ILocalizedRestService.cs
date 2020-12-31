using MonumentsMap.Application.Dto.Localized;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonumentsMap.Application.Services
{
    public interface ILocalizedRestService<TLocalized, TEditable, TEntity>
        where TLocalized: BaseLocalizedDto
        where TEditable: BaseEditableLocalizedDto<TEntity>
        where TEntity: Entity
    {
        Task<IEnumerable<TLocalized>> GetAsync(string cultureCode);
        Task<TLocalized> GetAsync(int id, string cultureCode);
        Task<TEditable> GetEditable(int id);
        Task<TEntity> EditAsync(TEditable model);
        Task<TEntity> CreateAsync(TEditable model);
        Task<int> RemoveAsync(int id);
    }
}
