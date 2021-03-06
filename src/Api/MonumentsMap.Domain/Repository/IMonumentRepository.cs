using System.Threading.Tasks;
using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface IMonumentRepository : IRepository<Monument>, IFilterRepository<Monument, MonumentFilterParameters>
    {
        Task<int> GetMinimumMonumentsYearAsync();
    }
}