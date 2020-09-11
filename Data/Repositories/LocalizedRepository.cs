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
        protected readonly TContext context;
        protected bool MinimizeResult { get; set; } = false;
        public LocalizedRepository(TContext context)
        {
            this.context = context;
        }

        public async Task<TEntity> Create(TEditableLocalizedEntity editableLocalizedEntity)
        {
            MinimizeResult = false;
            var entity = editableLocalizedEntity.CreateEntity();
            context.Set<TEntity>().Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        /// <summary>
        /// Return found elements or return an empty enumerable if there were no elements found
        /// </summary>
        /// <param name="cultureCode"></param>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public async Task<List<TLocalizedEntity>> Find(string cultureCode, Func<TEntity, bool> predicate)
        {
            MinimizeResult = true;
            var entities = IncludeNecessaryProps(context.Set<TEntity>().AsQueryable());
            var filteredEntities = entities.Where(predicate);
            return filteredEntities.Select(GetSelectHandler(cultureCode)).ToList();
        }

        public async Task<TLocalizedEntity> Get(string cultureCode, int id)
        {
            MinimizeResult = false;
            var query = context.Set<TEntity>()
                .Where(p => p.Id == id);
            return IncludeNecessaryProps(query)
            .Select(GetSelectHandler(cultureCode))
            .FirstOrDefault();
        }

        public async Task<TEditableLocalizedEntity> GetEditableLocalizedEntity(int id)
        {
            MinimizeResult = false;
            var query = context.Set<TEntity>()
                .Where(p => p.Id == id);
            var entity = await IncludeNecessaryProps(query)
                .FirstOrDefaultAsync();
            if(entity == null) return null;
            return GetEditableLocalizedEntity(entity);
        }

        public async Task<List<TLocalizedEntity>> GetAll(string cultureCode)
        {
            MinimizeResult = true;
            var entities = context.Set<TEntity>().AsQueryable();
            return IncludeNecessaryProps(entities).Select(GetSelectHandler(cultureCode)).ToList();
        }

        public async Task<TEntity> Update(TEditableLocalizedEntity editableLocalizedEntity)
        {
            MinimizeResult = false;
            var editEntity = IncludeNecessaryProps(context.Set<TEntity>().AsQueryable()).FirstOrDefault(p => p.Id == editableLocalizedEntity.Id);
            var entity = editableLocalizedEntity.CreateEntity(editEntity);
            context.Set<TEntity>().Update(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> Remove(int id)
        {
            var entity = await context.Set<TEntity>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            context.Set<TEntity>().Remove(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        //Convert model to localized model
        protected abstract Func<TEntity, TLocalizedEntity> GetSelectHandler(string cultureCode);
        //Including required property models that are associated with the main model
        protected abstract IQueryable<TEntity> IncludeNecessaryProps(IQueryable<TEntity> source);
        //Get editable entity model from entity
        protected abstract TEditableLocalizedEntity GetEditableLocalizedEntity(TEntity entity);
    }
}