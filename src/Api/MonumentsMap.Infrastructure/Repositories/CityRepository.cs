using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class CityRepository
        : FilterRepository<City, CityFilterParameters>,
        ICityRepository
    {
        public CityRepository(ApplicationContext context) : base(context)
        {
        }
    }
}