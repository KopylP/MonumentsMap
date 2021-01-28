using MassTransit;
using Microsoft.AspNetCore.Identity;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.User;
using MonumentsMap.IdentityService.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Consumers.User
{
    public class GetUserRolesConsumer : IConsumer<GetUserRolesCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetUserRolesConsumer(UserManager<ApplicationUser> userManager) => _userManager = userManager;

        public async Task Consume(ConsumeContext<GetUserRolesCommand> context)
        {
            var user = await _userManager.FindByIdAsync(context.Message.UserId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            await context.RespondAsync((await _userManager.GetRolesAsync(user))
                .Select(p => new RoleResult { Name = p }).ToArray());
        }
    }
}
