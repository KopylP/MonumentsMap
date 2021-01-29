using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Repository
{
    public interface IParticipantRepository : IRepository<Participant>, IFilterRepository<Participant, ParticipantFilterParameters>
    {
    }
}