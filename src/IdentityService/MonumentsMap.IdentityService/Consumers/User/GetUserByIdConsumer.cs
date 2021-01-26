using MassTransit;
using Microsoft.AspNetCore.Identity;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.User;
using MonumentsMap.IdentityService.Models;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Consumers.User
{
    public class GetUserByIdConsumer : IConsumer<GetUserByIdCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetUserByIdConsumer(UserManager<ApplicationUser> userManager) => _userManager = userManager;

        public async Task Consume(ConsumeContext<GetUserByIdCommand> context)
        {
            var user = await _userManager.FindByIdAsync(context.Message.UserId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            await context.RespondAsync(await user.AdaptUserToModelAsync(_userManager));
        }
    }
}
