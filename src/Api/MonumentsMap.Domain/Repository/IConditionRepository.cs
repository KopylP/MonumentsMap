using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface IConditionRepository : IRepository<Condition>, IFilterRepository<Condition, ConditionFilterParameters>
    {
    }
}