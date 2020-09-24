using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Contracts.Services
{
    public interface IUserService
    {
        Task<IEnumerable<ApplicationUser>> GetUsersAsync();
        Task<UserViewModel> GetUserByIdAsync(string userId);
        Task<ApplicationUser> DeleteUserAsync(string userId);
        Task<IEnumerable<RoleViewModel>> GetUserRolesAsync(string userId);
        Task<UserViewModel> ChangeUserRolesAsync(string userId, UserRoleViewModel userRoleViewModel);
        Task<UserViewModel> RemoveUserFromRolesAsync(string userId, UserRoleViewModel userRoleViewModel);
    }
}