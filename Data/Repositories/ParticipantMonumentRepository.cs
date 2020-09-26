using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data.Repositories
{
    public class ParticipantMonumentRepository : Repository<ParticipantMonument, ApplicationContext>,
        IParticipantMonumentRepository
    {

        public ParticipantMonumentRepository(ApplicationContext context) : base(context)
        {

        }
    }
}