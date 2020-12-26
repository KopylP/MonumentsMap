using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Api.Exceptions;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

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
        protected virtual Func<LocalizationSet> SlugProperty => null;
        public LocalizedRepository(TContext context)
        {
            this.context = context;
        }

        public async Task<TEntity> Create(TEditableLocalizedEntity editableLocalizedEntity)
        {
            MinimizeResult = false;
            var entity = editableLocalizedEntity.CreateEntity();

            if (entity is BusinessEntity be)
            {
                be.CreatedAt = DateTime.Now;
                be.UpdatedAt = DateTime.Now;
            }

            BeforeModelCreate(entity);
            context.Set<TEntity>().Add(entity);
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InternalServerErrorException(ex.InnerException?.Message);
            }
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
            var resultEntities = await Task.Run(() => filteredEntities
                .Select(GetSelectHandler(cultureCode))
                .ToList());
            return resultEntities;
        }

        public async Task<TLocalizedEntity> Get(string cultureCode, int id)
        {
            MinimizeResult = false;
            var query = context.Set<TEntity>()
                .Where(p => p.Id == id);

            var model = (await IncludeNecessaryProps(query)
            .ToListAsync())
            .Select(GetSelectHandler(cultureCode))
            .FirstOrDefault();

            if (model == null)
            {
                throw new NotFoundException("Model not found");
            }

            return model;
        }

        public async Task<TEditableLocalizedEntity> GetEditableLocalizedEntity(int id)
        {
            MinimizeResult = false;
            var query = context.Set<TEntity>()
                .Where(p => p.Id == id);
            var entity = await IncludeNecessaryProps(query)
                .FirstOrDefaultAsync();
            if (entity == null)
            {
                throw new NotFoundException("Model not found");
            }
            return GetEditableLocalizedEntity(entity);
        }

        public async Task<List<TLocalizedEntity>> GetAll(string cultureCode)
        {
            MinimizeResult = true;
            var entities = context.Set<TEntity>().AsQueryable();
            return (await IncludeNecessaryProps(entities).ToListAsync())
                .Select(GetSelectHandler(cultureCode))
                .ToList();
        }

        public async Task<TEntity> Update(TEditableLocalizedEntity editableLocalizedEntity)
        {
            MinimizeResult = false;
            var editEntity = IncludeNecessaryProps(context.Set<TEntity>().AsQueryable()).FirstOrDefault(p => p.Id == editableLocalizedEntity.Id);
            if (editEntity == null)
            {
                throw new NotFoundException();
            }
            var entity = editableLocalizedEntity.CreateEntity(editEntity);

            if (entity is BusinessEntity be)
            {
                be.UpdatedAt = DateTime.Now;
            }

            BeforeModelUpdate(entity);
            context.Set<TEntity>().Update(entity);
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InternalServerErrorException(ex.InnerException?.Message);
            }
            return entity;
        }

        public async Task<TEntity> Remove(int id)
        {
            var entity = await context.Set<TEntity>().FindAsync(id);
            if (entity == null)
            {
                throw new NotFoundException("Model not found");
            }

            context.Set<TEntity>().Remove(entity);
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InternalServerErrorException(ex.InnerException?.Message);
            }
            return entity;
        }

        // Convert model to localized model
        protected abstract Func<TEntity, TLocalizedEntity> GetSelectHandler(string cultureCode);
        // Including required property models that are associated with the main model
        protected abstract IQueryable<TEntity> IncludeNecessaryProps(IQueryable<TEntity> source);
        // Get editable entity model from entity
        protected abstract TEditableLocalizedEntity GetEditableLocalizedEntity(TEntity entity);
        // Execute before model update
        protected virtual void BeforeModelUpdate(TEntity entity) {}
        // Execute before model create
        protected virtual void BeforeModelCreate(TEntity entity) {}
    }
}