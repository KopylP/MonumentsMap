using System;

namespace MonumentsMap.Contracts.User
{
    public class UserResult
    {
        public string DisplayName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Id { get; set; }
        public string Email { get; set; }
        public RoleResult[] Roles { get; set; }
    }
}