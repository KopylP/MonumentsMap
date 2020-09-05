using System;
using System.Collections.Generic;

namespace MonumentsMap.ViewModels
{
    public class UserViewModel
    {
        public string DisplayName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Id { get; set; }
        public string Email { get; set; }
        public List<RoleViewModel> Roles { get; set; }
    }
}