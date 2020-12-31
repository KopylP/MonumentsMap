using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonumentsMap.Domain.Repository
{
    public interface IMonumentRepository : IRepository<Monument>
    {
        Task<IEnumerable<Monument>> GetByFilterAsync(MonumentFilterParameters parameters);
    }
}