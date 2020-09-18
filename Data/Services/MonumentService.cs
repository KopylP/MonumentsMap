using System.Threading.Tasks;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Contracts.Services;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data.Services
{
    public class MonumentService : IMonumentService
    {
        #region  private fields
        private readonly IMonumentRepository _monumentRepository;
        #endregion
        #region constructor
        public MonumentService(IMonumentRepository repo) => _monumentRepository = repo;
        #endregion
        #region interface methods
        public async Task<Monument> ToogleMajorPhotoAsync(int monumentId)
        {
            var monument = await _monumentRepository.Get(monumentId);
            if (monument == null) return monument;
            monument.Accepted = !monument.Accepted;
            await _monumentRepository.Update(monument);
            return monument;
        }
        #endregion
    }
}