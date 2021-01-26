using MassTransit;
using Microsoft.AspNetCore.Identity;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.User;
using MonumentsMap.IdentityService.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Consumers.User
{
    public class RemoveUserFromRolesConsumer : IConsumer<RemoveUserFromRolesCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public RemoveUserFromRolesConsumer(UserManager<ApplicationUser> userManager) => _userManager = userManager;

        public async Task Consume(ConsumeContext<RemoveUserFromRolesCommand> context)
        {
            var model = context.Message;

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            if (!userRoles.Contains("Admin") && model.RoleNames.Contains("Admin"))
            {
                throw new BadRequestException("System provides only one administrator");
            }

            if (userRoles.Contains("Admin") && !model.RoleNames.Contains("Admin"))
            {
                throw new BadRequestException("It is impossible to take away administrator rights from the administrator");
            }

            var removeRolesResult = await _userManager
                .RemoveFromRolesAsync(user, await _userManager.GetRolesAsync(user));

            if (!removeRolesResult.Succeeded)
            {
                throw new InternalServerErrorException("Failed to delete user roles");
            }
            var result = await _userManager.AddToRolesAsync(user, model.RoleNames);
            if (!result.Succeeded)
            {
                throw new InternalServerErrorException("Failed to add user to roles");
            }
            
            await context.RespondAsync(await user.AdaptUserToModelAsync(_userManager));
        }
    }
}
