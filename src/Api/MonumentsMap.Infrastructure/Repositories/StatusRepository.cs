using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class StatusRepository
    : FilterRepository<Status, StatusFilterParameters>,
    IStatusRepository
    {
        public StatusRepository(ApplicationContext context) : base(context)
        {
        }
    }
}