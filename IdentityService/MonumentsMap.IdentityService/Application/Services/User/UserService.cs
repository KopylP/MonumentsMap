using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Application.Services.User;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.User;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Data.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserService(UserManager<ApplicationUser> userManager) => _userManager = userManager;

        public async Task<UserResult> ChangeUserRolesAsync(string userId, ChangeUserRolesCommand userRoleViewModel)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            if (!userRoles.Contains("Admin") && userRoleViewModel.RoleNames.Contains("Admin"))
            {
                throw new BadRequestException("System provides only one administrator");
            }

            if (userRoles.Contains("Admin") && !userRoleViewModel.RoleNames.Contains("Admin"))
            {
                throw new BadRequestException("It is impossible to take away administrator rights from the administrator");
            }
            
            var removeRolesResult = await _userManager
                .RemoveFromRolesAsync(user, await _userManager.GetRolesAsync(user));

            if (!removeRolesResult.Succeeded)
            {
                throw new InternalServerErrorException("Failed to delete user roles");
            }
            var result = await _userManager.AddToRolesAsync(user, userRoleViewModel.RoleNames);
            if (!result.Succeeded)
            {
                throw new InternalServerErrorException("Failed to add user to roles");
            }
            return await user.AdaptUserToModelAsync(_userManager);
        }

        public async Task<ApplicationUser> DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Contains("Admin"))
            {
                throw new ProhibitException("Can't delete a user with administrator rights");
            }
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            await _userManager.DeleteAsync(user);
            return user;
        }

        public async Task<UserResult> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            return await user.AdaptUserToModelAsync(_userManager);
        }

        public async Task<IEnumerable<RoleResult>> GetUserRolesAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            return (await _userManager.GetRolesAsync(user))
                .Select(p => new RoleResult { Name = p });
        }

        public async Task<IEnumerable<ApplicationUser>> GetUsersAsync()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<UserResult> RemoveUserFromRolesAsync(string userId, ChangeUserRolesCommand userRoleViewModel)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Contains("Admin"))
            {
                throw new ProhibitException("Can't remove roles from user with administrator rights");
            }
            var result = await _userManager.RemoveFromRolesAsync(user, userRoleViewModel.RoleNames);
            if (!result.Succeeded)
            {
                throw new InternalServerErrorException("Failed to remove roles from user");
            }
            return await user.AdaptUserToModelAsync(_userManager);
        }
    }
}