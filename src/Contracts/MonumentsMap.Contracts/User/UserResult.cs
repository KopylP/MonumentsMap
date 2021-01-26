using System;
using System.Collections.Generic;

namespace MonumentsMap.Contracts.User
{
    public class UserResult
    {
        public string DisplayName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Id { get; set; }
        public string Email { get; set; }
        public List<RoleResult> Roles { get; set; }

        //public static UserDto FromUser(ApplicationUser user)
        //{
        //    return new UserDto
        //    {
        //        Id = user.Id,
        //        Email = user.Email,
        //        CreatedAt = user.CreatedAt,
        //        UpdatedAt = user.UpdatedAt,
        //        DisplayName = user.DisplayName,
        //    };
        //}
    }
}