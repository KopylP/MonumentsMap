using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface IStatusRepository : IRepository<Status>, IFilterRepository<Status, StatusFilterParameters>
    {

    }
}