using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MonumentsMap.Domain.Models;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Application.Extensions
{
    public static class UserExtensions
    {
        public static async Task<UserDto> AdaptUserToModelAsync(this ApplicationUser user, UserManager<ApplicationUser> userManager)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DisplayName = user.DisplayName,
                Roles = (await userManager.GetRolesAsync(user)).Select(role => new RoleDto { Name = role }).ToList()
            };
        }
    }
}