using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonumentsMap.Application.Services.Monuments
{
    public interface ITagService
    {
        Task<IList<string>> GetAsync();
        Task<string> CreateAsync(string tagName);
        Task<string> RemoveAsync(string tagName);
    }
}
