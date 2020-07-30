using System.Threading.Tasks;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.Services.Interfaces;

namespace MonumentsMap.Services
{
    public class MonumentService : IMonumentService
    {
        #region  private fields
        private readonly MonumentRepository _monumentRepository;
        #endregion
        #region constructor
        public MonumentService(MonumentRepository repo) => _monumentRepository = repo;
        #endregion
        #region interface methods
        public async Task<Monument> ToogleMajorPhotoAsync(int monumentId)
        {
            var monument = await _monumentRepository.Get(monumentId);
            if(monument == null) return monument;
            monument.Accepted = !monument.Accepted;
            await _monumentRepository.Update(monument);
            return monument;
        }
        #endregion
    }
}