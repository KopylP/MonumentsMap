using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class RoleController : ControllerBase
    {
        #region private fields
        private readonly RoleManager<IdentityRole> _roleManager;
        #endregion
        #region constructor
        public RoleController(RoleManager<IdentityRole> roleManager) => _roleManager = roleManager;
        #endregion
        #region rest methods
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return Ok(roles.Select(p => new { p.Name }));
        }
        #endregion
    }
}