using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class ParticipantRepository
        : FilterRepository<Participant, ParticipantFilterParameters>,
        IParticipantRepository
    {
        public ParticipantRepository(ApplicationContext context) : base(context)
        {
        }
    }
}