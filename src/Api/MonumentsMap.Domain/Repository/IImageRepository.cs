using System.Threading.Tasks;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface IImageRepository
    {
        Task SaveImageAsync(Image file);
        Task<Image> GetImageAsync(string path, string imageName);
        Task DeleteImageAsync(string path, string imageName);
    }
}