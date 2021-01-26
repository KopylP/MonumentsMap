using MassTransit;
using Microsoft.AspNetCore.Identity;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.User;
using MonumentsMap.IdentityService.Models;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Consumers.User
{
    public class DeleteUserByIdConsumer : IConsumer<DeleteUserByIdCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public DeleteUserByIdConsumer(UserManager<ApplicationUser> userManager) => _userManager = userManager;

        public async Task Consume(ConsumeContext<DeleteUserByIdCommand> context)
        {
            var user = await _userManager.FindByIdAsync(context.Message.UserId);
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

            await context.RespondAsync(new UserResult
            {
                Id = user.Id,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DisplayName = user.DisplayName
            });
        }
    }
}
