using MassTransit;
using Microsoft.AspNetCore.Identity;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.User;
using MonumentsMap.IdentityService.Models;
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

            var user = await _userManager.FindByIdAsync(context.Message.UserId);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Contains("Admin"))
            {
                throw new ProhibitException("Can't remove roles from user with administrator rights");
            }

            var result = await _userManager.RemoveFromRolesAsync(user, model.RoleNames);

            if (!result.Succeeded)
            {
                throw new InternalServerErrorException("Failed to remove roles from user");
            }

            await context.RespondAsync(await user.AdaptUserToModelAsync(_userManager));
        }
    }
}
