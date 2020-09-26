using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Contracts.Repository
{
    public interface IParticipantMonumentRepository : IRepository<ParticipantMonument>
    {
        Task<IEnumerable<Participant>> GetParticipantsByMonumentWithLocalizationsAsync(int monumentId);
    }
}