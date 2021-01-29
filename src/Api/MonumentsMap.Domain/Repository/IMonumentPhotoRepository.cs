using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface IMonumentPhotoRepository : IRepository<MonumentPhoto>, IFilterRepository<MonumentPhoto, MonumentPhotoFilterParameters>
    {

    }
}