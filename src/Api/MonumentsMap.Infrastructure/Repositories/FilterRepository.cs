using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.Paging;
using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class FilterRepository<TEntity, TFilter> : Repository<TEntity>, IFilterRepository<TEntity, TFilter>
        where TEntity : Entity
        where TFilter : BaseFilterParameters
    {
        public FilterRepository(ApplicationContext context) : base(context) { }

        public virtual async Task<PagingList<TEntity>> Filter(TFilter filterParameters, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = dbSet;

            if (includes != null)
                foreach (var include in includes)
                    query = query.Include(include);

            query = query.OrderBy(p => p.Id);

            return await PagingList<TEntity>.ToPagedListAsync(query, filterParameters.PageNumber, filterParameters.PageSize);
        }
    }
}
