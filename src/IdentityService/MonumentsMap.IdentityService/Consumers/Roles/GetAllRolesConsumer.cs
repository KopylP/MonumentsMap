using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.Roles;
using MonumentsMap.Contracts.User;
using System.Linq;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Consumers.Roles
{
    public class GetAllRolesConsumer : IConsumer<GetAllRolesCommand>
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public GetAllRolesConsumer(RoleManager<IdentityRole> roleManager) => _roleManager = roleManager;

        public async Task Consume(ConsumeContext<GetAllRolesCommand> context)
        {
            var roles = await _roleManager.Roles.ToListAsync();
            await context.RespondAsync(roles.Select(p => new RoleResult
            {
                Name = p.Name
            })
            .ToArray());
        }
    }
}
