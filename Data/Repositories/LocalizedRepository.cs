using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Data.Repositories
{
    public abstract class LocalizedRepository<TLocalizedEntity, TEditableLocalizedEntity, TEntity, TContext> 
    : ILocalizedRepository<TLocalizedEntity, TEditableLocalizedEntity, TEntity>
    where TLocalizedEntity : LocalizedEntity
    where TEntity : Entity
    where TEditableLocalizedEntity : EditableLocalizedEntity<TEntity>
    where TContext : DbContext
    {
        private readonly TContext context;
        public LocalizedRepository(TContext context)
        {
            this.context = context;
        }

        public async Task<TEntity> Create(TEditableLocalizedEntity editableLocalizedEntity)
        {
            var entity = editableLocalizedEntity.CreateEntity();
            context.Set<TEntity>().Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<TLocalizedEntity>> Find(string cultureCode, Func<TEntity, bool> predicate)
        {
            var entities = context.Set<TEntity>().AsQueryable();
            var filteredEntities = entities.Where(predicate);
            return IncludeNecessaryProps(filteredEntities.AsQueryable()).Select(GetSelectHandler(cultureCode)).ToList();
        }

        public async Task<TLocalizedEntity> Get(string cultureCode, int id)
        {
            var query = context.Set<TEntity>()
                .Where(p => p.Id == id);
                return IncludeNecessaryProps(query)
                .Select(GetSelectHandler(cultureCode))
                .FirstOrDefault();
        }

        public async Task<List<TLocalizedEntity>> GetAll(string cultureCode)
        {
            var entities = context.Set<TEntity>().AsQueryable();
            return IncludeNecessaryProps(entities, true).Select(GetSelectHandler(cultureCode, true)).ToList();
        }

        public async Task<TEntity> Update(TEditableLocalizedEntity editableLocalizedEntity)
        {
            var editEntity = IncludeNecessaryProps(context.Set<TEntity>().AsQueryable()).FirstOrDefault(p => p.Id == editableLocalizedEntity.Id);
            var entity = editableLocalizedEntity.CreateEntity(editEntity);
            context.Set<TEntity>().Update(entity);
            await context.SaveChangesAsync();
            return entity;        
        }

        //Convert model to localized model
        public abstract Func<TEntity, TLocalizedEntity> GetSelectHandler(string cultureCode, bool minimized = false);
        //Including required property models that are associated with the main model
        public abstract IQueryable<TEntity> IncludeNecessaryProps(IQueryable<TEntity> source, bool minimized = false);
    }
}