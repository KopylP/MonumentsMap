using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MonumentsMap.IdentityService.Models;

namespace MonumentsMap.IdentityService.Contracts.Repositories
{
    public interface IRepository<T> where T : Entity
    {
        Task<List<T>> GetAll(params Expression<Func<T, object>>[] includes);
        Task<T> Get(int id, params Expression<Func<T, object>>[] includes);
        Task<T> Single(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
        Task<List<T>> Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int id);
        IQueryable<T> GetQuery();
        Task SaveChangeAsync();
    }
}