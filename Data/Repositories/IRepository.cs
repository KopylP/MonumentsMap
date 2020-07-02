using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Models;

namespace MonumentsMap.Data.Repositories
{
    public interface IRepository<T> where T : Entity
    {
         Task<List<T>> GetAll();
         Task<T> Get(int id);
         Task<List<T>> Find(Func<T, bool> predicate);
         Task<T> Add(T entity);
         Task<T> Update(T entity);
         Task<T> Delete(int id);
    }
}