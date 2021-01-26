using MonumentsMap.IdentityService.Contracts.Repositories;
using MonumentsMap.IdentityService.Models;
using MonumentsMap.IdentityService.Persistence;

namespace MonumentsMap.IdentityService.Infrastructure.Repositories
{
    public class InvitationRepository : Repository<Invitation>, IInvitationRepository
    {
        public InvitationRepository(ApplicationContext applicationContext) : base(applicationContext) { }
    }
}