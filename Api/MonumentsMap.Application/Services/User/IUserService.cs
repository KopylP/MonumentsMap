using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Domain.Models;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Application.Services.User
{
    public interface IUserService
    {
        Task<IEnumerable<ApplicationUser>> GetUsersAsync();
        Task<UserDto> GetUserByIdAsync(string userId);
        Task<ApplicationUser> DeleteUserAsync(string userId);
        Task<IEnumerable<RoleDto>> GetUserRolesAsync(string userId);
        Task<UserDto> ChangeUserRolesAsync(string userId, UserRoleDto userRoleViewModel);
        Task<UserDto> RemoveUserFromRolesAsync(string userId, UserRoleDto userRoleViewModel);
    }
}