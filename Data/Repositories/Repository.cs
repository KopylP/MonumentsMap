using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Models;
using MonumentsMap.Extensions;

namespace MonumentsMap.Data.Repositories
{
    public abstract class Repository<TEntity, TContext> : IRepository<TEntity>
    where TEntity : Entity
    where TContext : DbContext
    {
        private readonly TContext context;
        public Repository(TContext context)
        {
            this.context = context;
        }

        public bool Commit { get; set; } = true;

        public async Task<TEntity> Add(TEntity entity)
        {
            context.Set<TEntity>().Add(entity);
            if (Commit)
                await context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> Delete(int id)
        {
            var entity = await context.Set<TEntity>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            context.Set<TEntity>().Remove(entity);
            if (Commit)
                await context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<TEntity>> Find(Func<TEntity, bool> predicate, string includeProperties = "")
        {
            var entities = await context.Set<TEntity>()
                .IncludeProps(includeProperties)
                .ToListAsync();

            return entities.Where(predicate).ToList();
        }

        public async Task<TEntity> Get(int id, string includeProperties = "")
        {
            if (string.IsNullOrEmpty(includeProperties))
            {
                return await context.Set<TEntity>()
                    .FindAsync(id);
            }
            return await context.Set<TEntity>()
                .Where(p => p.Id == id)
                .IncludeProps(includeProperties)
                .FirstOrDefaultAsync();
        }

        public async Task<List<TEntity>> GetAll(string includeProperties = "")
        {
            return await context
                .Set<TEntity>()
                .IncludeProps(includeProperties)
                .ToListAsync();
        }

        public async Task SaveChangeAsync()
        {
            await context.SaveChangesAsync();
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            context.Set<TEntity>().Update(entity);
            if (Commit)
                await context.SaveChangesAsync();
            return entity;
        }
    }
}