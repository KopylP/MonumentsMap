using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class ConditionRepository
        : FilterRepository<Condition, ConditionFilterParameters>,
        IConditionRepository
    {
        public ConditionRepository(ApplicationContext context) : base(context)
        {
        }
    }
}