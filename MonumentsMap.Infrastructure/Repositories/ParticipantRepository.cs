using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class ParticipantRepository
        : Repository<Participant>,
        IParticipantRepository
    {
        public ParticipantRepository(ApplicationContext context) : base(context)
        {
        }
    }
}