using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface IParticipantMonumentRepository : IRepository<ParticipantMonument>
    {
        Task<IEnumerable<Participant>> GetParticipantsByMonumentWithLocalizationsAsync(int monumentId);
    }
}