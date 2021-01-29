using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface ICityRepository : IRepository<City>, IFilterRepository<City, CityFilterParameters>
    {

    }
}