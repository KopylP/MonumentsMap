using MonumentsMap.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonumentsMap.Domain.Repository
{
    public interface ITagRepository
    {
        Task<List<Tag>> GetAll();
        Task<Tag> Get(string tagName);
        Task<Tag> Add(string tagName);
        Task<Tag> Delete(string tagName);
        Task<bool> IsExists(string tagName);
        Task SaveChangeAsync();
    }
}
