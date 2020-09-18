using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data.Repositories
{
    public class InvitationRepository : Repository<Invitation, ApplicationContext>, IInvitationRepository
    {
        public InvitationRepository(ApplicationContext applicationContext) : base(applicationContext) { }
    }
}