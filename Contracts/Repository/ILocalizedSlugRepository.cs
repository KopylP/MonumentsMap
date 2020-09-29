using System.Threading.Tasks;
using MonumentsMap.Entities.ViewModels.LocalizedModels;

namespace MonumentsMap.Contracts.Repository
{
    public interface ILocalizedSlugRepository<T> where T : LocalizedEntity
    {
        Task<T> GetEntityBySlugAsync(string slug, string cultureCode);         
    }
}