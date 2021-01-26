using System.Collections.Generic;
using System.Threading.Tasks;
using MonumentsMap.Application.Dto.User;

namespace MonumentsMap.Application.Services.User
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponseDto>> GetUsersAsync();
        Task<UserResponseDto> GetUserByIdAsync(string userId);
        Task<UserResponseDto> DeleteUserAsync(string userId);
        Task<IEnumerable<RoleResponseDto>> GetUserRolesAsync(string userId);
        Task<UserResponseDto> ChangeUserRolesAsync(string userId, UserRoleRequestDto userRoleViewModel);
        Task<UserResponseDto> RemoveUserFromRolesAsync(string userId, UserRoleRequestDto userRoleViewModel);
    }
}