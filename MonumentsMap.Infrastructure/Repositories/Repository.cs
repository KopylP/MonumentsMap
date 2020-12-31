using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public abstract class Repository<TEntity> : IRepository<TEntity>
    where TEntity : Entity
    {
        protected readonly DbSet<TEntity> dbSet;
        private readonly ApplicationContext context;

        public Repository(ApplicationContext context)
        {
            dbSet = context.Set<TEntity>();
            this.context = context;
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            if (entity is BusinessEntity be)
            {
                be.CreatedAt = DateTime.Now;
                be.UpdatedAt = DateTime.Now;
            }

            await dbSet.AddAsync(entity);
            return entity;
        }

        public async Task<TEntity> Delete(int id)
        {
            var entity = await context.Set<TEntity>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            dbSet.Remove(entity);
            return entity;
        }

        public async Task<List<TEntity>> Find(Func<TEntity, bool> predicate, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();
            if (includes != null)
                foreach (var include in includes)
                    query = query.Include(include);

            var entities = await query.ToListAsync();

            return entities.Where(predicate).ToList();
        }

        public IQueryable<TEntity> GetQuery()
        {
            return context.Set<TEntity>();
        }

        public async Task<TEntity> Get(int id, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();
            if (includes != null)
                foreach (var include in includes)
                    query = query.Include(include);

            return await query
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<List<TEntity>> GetAll(params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();
            if (includes != null)
                foreach (var include in includes)
                    query = query.Include(include);

            return await query.ToListAsync();
        }

        public async Task SaveChangeAsync()
        {
            await context.SaveChangesAsync();
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            if (entity is BusinessEntity be)
            {
                be.UpdatedAt = DateTime.Now;
            }
            dbSet.Update(entity);
            return await Task.FromResult(entity);
        }
    }
}