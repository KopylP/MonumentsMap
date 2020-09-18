using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Extensions
{
    public static class UserExtensions
    {
        public static async Task<UserViewModel> AdaptUserToModelAsync(this ApplicationUser user, UserManager<ApplicationUser> userManager)
        {
            return new UserViewModel
            {
                Id = user.Id,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DisplayName = user.DisplayName,
                Roles = (await userManager.GetRolesAsync(user)).Select(role => new RoleViewModel { Name = role }).ToList()
            };
        }
        public static UserViewModel AdaptUserToModel(this ApplicationUser user)
        {
            return new UserViewModel
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