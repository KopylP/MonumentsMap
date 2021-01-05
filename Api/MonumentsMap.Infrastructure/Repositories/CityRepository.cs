using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class CityRepository
        : Repository<City>,
        ICityRepository
    {
        public CityRepository(ApplicationContext context) : base(context)
        {
        }
    }
}