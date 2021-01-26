using System.Collections.Generic;

namespace MonumentsMap.Contracts.User
{
    public class RemoveUserFromRolesCommand : BaseCommand
    {
        public IEnumerable<string> RoleNames { get; set; }
        public string UserId { get; set; }
    }
}
