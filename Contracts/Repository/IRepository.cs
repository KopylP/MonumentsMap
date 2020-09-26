using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Contracts.Repository
{
    public interface IRepository<T> where T : Entity
    {
        bool Commit { get; set; }
        Task<List<T>> GetAll(string includeProperties = "");
        Task<T> Get(int id, string includeProperties = "");
        Task<List<T>> Find(Func<T, bool> predicate, string includeProperties = "");
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int id);
        Task SaveChangeAsync();
    }
}