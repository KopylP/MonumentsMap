using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Services.Roles;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Authorize(Roles = "Admin")]
    public class RoleController : BaseController
    {
        private readonly IRolesService _rolesService;

        public RoleController(IRolesService rolesService) => _rolesService = rolesService;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var roles = await _rolesService.GetAllRolesAsync();
            return Ok(roles);
        }
    }
}