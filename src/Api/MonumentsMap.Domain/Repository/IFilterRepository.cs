using MonumentsMap.Contracts.Paging;
using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MonumentsMap.Domain.Repository
{
    public interface IFilterRepository<TEntity, TFilter> where TFilter : BaseFilterParameters
        where TEntity : Entity
    {
        Task<PagingList<TEntity>> Filter(TFilter filterParameters, params Expression<Func<TEntity, object>>[] includes);
    }
}
