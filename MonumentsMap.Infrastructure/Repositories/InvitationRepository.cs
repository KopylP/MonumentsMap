using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class InvitationRepository : Repository<Invitation>, IInvitationRepository
    {
        public InvitationRepository(ApplicationContext applicationContext) : base(applicationContext) { }
    }
}