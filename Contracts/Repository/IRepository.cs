using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Contracts.Repository
{
    public interface IRepository<T> where T : Entity
    {
        Task<List<T>> GetAll(string includeProperties = "");
        Task<T> Get(int id, string includeProperties = "");
        Task<List<T>> Find(Func<T, bool> predicate, string includeProperties = "");
        Task<T> Add(T entity, bool commit = true);
        Task<T> Update(T entity, bool commit = true);
        Task<T> Delete(int id, bool commit = true);
        Task SaveChangeAsync();
    }
}