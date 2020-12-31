using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface IRepository<T> where T : Entity
    {
        Task<List<T>> GetAll(params Expression<Func<T, object>>[] includes);
        Task<T> Get(int id, params Expression<Func<T, object>>[] includes);
        Task<List<T>> Find(Func<T, bool> predicate, params Expression<Func<T, object>>[] includes);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int id);
        IQueryable<T> GetQuery();
        Task SaveChangeAsync();
    }
}