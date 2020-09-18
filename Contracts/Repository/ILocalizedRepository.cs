using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Contracts.Repository
{
    public interface ILocalizedRepository<TLocalizedEntity, TEditableLocalizedEntity, TEntity>
    where TLocalizedEntity : LocalizedEntity
    where TEditableLocalizedEntity : EditableLocalizedEntity<TEntity>
    where TEntity : Entity
    {
        Task<List<TLocalizedEntity>> GetAll(string cultureCode);
        Task<TLocalizedEntity> Get(string cultureCode, int id);
        Task<TEntity> Remove(int id);
        Task<List<TLocalizedEntity>> Find(string cultureCode, Func<TEntity, bool> predicate);
        Task<TEntity> Create(TEditableLocalizedEntity editableLocalizedEntity);
        Task<TEntity> Update(TEditableLocalizedEntity editableLocalizedEntity);
        Task<TEditableLocalizedEntity> GetEditableLocalizedEntity(int id);
    }
}