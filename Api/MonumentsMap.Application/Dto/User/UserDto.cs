using MonumentsMap.Domain.Models;
using System;
using System.Collections.Generic;

namespace MonumentsMap.Entities.ViewModels
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Id { get; set; }
        public string Email { get; set; }
        public List<RoleDto> Roles { get; set; }

        public static UserDto FromUser(ApplicationUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DisplayName = user.DisplayName,
            };
        }
    }
}