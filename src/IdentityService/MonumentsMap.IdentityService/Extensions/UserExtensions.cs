using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MonumentsMap.Contracts.User;
using MonumentsMap.IdentityService.Models;

namespace MonumentsMap.Application.Extensions
{
    public static class UserExtensions
    {
        public static async Task<UserResult> AdaptUserToModelAsync(this ApplicationUser user, UserManager<ApplicationUser> userManager)
        {
            return new UserResult
            {
                Id = user.Id,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DisplayName = user.DisplayName,
                Roles = (await userManager.GetRolesAsync(user)).Select(role => new RoleResult { Name = role }).ToArray()
            };
        }
    }
}