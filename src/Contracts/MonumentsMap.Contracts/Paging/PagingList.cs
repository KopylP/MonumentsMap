using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonumentsMap.Contracts.Paging
{
    public class PagingList<T>
    {
        public PagingInformation PagingInformation { get; private set; }
        public T[] Items { get; set; }

        private PagingList() { }

        public PagingList(List<T> items, int count, int pageNumber, int pageSize)
        {
            PagingInformation = new PagingInformation
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };

            Items = items.ToArray();
        }

        public PagingList(List<T> items, PagingInformation pagingInformation)
        {
            Items = items.ToArray();
            PagingInformation = pagingInformation;
        }

        public static async Task<PagingList<T>> ToPagedListAsync(IQueryable<T> source, int pageNumber, int? pageSize)
        {
            var count = source.Count();

            if (pageSize == null)
            {
                pageSize = count;
            }

            var items = await Task.FromResult(source.Skip((pageNumber - 1) * pageSize.Value).Take(pageSize.Value).ToList());
            return new PagingList<T>(items, count, pageNumber, pageSize.Value);
        }
    }
}
