using System.Collections.Generic;

namespace MonumentsMap.Entities.ViewModels
{
    public class UserRoleViewModel
    {
        public string UserId { get; set; }
        public IEnumerable<string> RoleNames { get; set; }
    }
}