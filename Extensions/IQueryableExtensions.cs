using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> IncludeProps<T>(this IQueryable<T> @this, string includeProperties)
            where T : Entity
        {
            foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                @this = @this.Include(includeProperty);
            }
            return @this;
        }
    }
}