using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.User;
using MonumentsMap.IdentityService.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Consumers.User
{
    public class GetUsersConsumer : IConsumer<GetUsersCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetUsersConsumer(UserManager<ApplicationUser> userManager) => _userManager = userManager;

        public async Task Consume(ConsumeContext<GetUsersCommand> context)
        {
            var results = (await _userManager.Users.Select(user => new UserResult {
                Id = user.Id,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DisplayName = user.DisplayName
            }).ToListAsync())
            .AsEnumerable();

            await context.RespondAsync(results);
        }
    }
}
