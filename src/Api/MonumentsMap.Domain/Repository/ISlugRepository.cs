using System.Threading.Tasks;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface ISlugRepository<T> where T : Entity
    {
        Task<T> GetEntityBySlugAsync(string slug);
    }
}