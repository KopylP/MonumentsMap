using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Services.Roles;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class RoleController : ControllerBase
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