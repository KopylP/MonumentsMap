using System.Threading.Tasks;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;

namespace MonumentsMap.Contracts.Repository
{
    public interface ISlugRepository<T> where T : Entity
    {
        Task<T> GetEntityBySlugAsync(string slug);         
    }
}