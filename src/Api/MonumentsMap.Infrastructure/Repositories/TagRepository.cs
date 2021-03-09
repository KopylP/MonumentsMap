using Microsoft.EntityFrameworkCore;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonumentsMap.Infrastructure.Repositories
{
    class TagRepository : ITagRepository
    {
        protected readonly DbSet<Tag> dbSet;
        protected readonly ApplicationContext applicationContext;

        public TagRepository(ApplicationContext context)
        {
            dbSet = context.Set<Tag>();
            applicationContext = context;
        }
        public async Task<Tag> Add(string tagName)
        {
            var tag = new Tag(tagName);
            await dbSet.AddAsync(tag);
            return tag;

        }

        public async Task<Tag> Delete(string tagName)
        {
            var tag = await dbSet.FindAsync(tagName);
            if (tag != null)
            {
                dbSet.Remove(tag);
            }

            return tag;
        }

        public async Task<Tag> Get(string tagName)
        {
            return await dbSet.FindAsync(tagName);
        }

        public async Task<List<Tag>> GetAll()
        {
            return await dbSet.ToListAsync();
        }

        public async Task<bool> IsExists(string tagName)
        {
            return (await dbSet.Where(p => p.TagName == tagName).ToListAsync()).Any();
        }

        public async Task SaveChangeAsync()
        {
            await applicationContext.SaveChangesAsync();
        }
    }
}
