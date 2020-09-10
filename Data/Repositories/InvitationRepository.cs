using MonumentsMap.Models;

namespace MonumentsMap.Data.Repositories
{
    public class InvitationRepository : Repository<Invitation, ApplicationContext>
    {
        public InvitationRepository(ApplicationContext applicationContext) : base(applicationContext) { }
    }
}