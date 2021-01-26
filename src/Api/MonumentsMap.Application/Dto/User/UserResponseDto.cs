using System;
using System.Collections.Generic;

namespace MonumentsMap.Application.Dto.User
{
    public class UserResponseDto
    {
        public string DisplayName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Id { get; set; }
        public string Email { get; set; }
        public List<RoleResponseDto> Roles { get; set; }
    }
}