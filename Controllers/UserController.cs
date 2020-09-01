using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Models;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        #region private fields
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        #endregion
        #region constructor
        public UserController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
             _userManager = userManager;
             _roleManager = roleManager;
        }
        #endregion
        #region rest methods
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user == null) return Unauthorized(); //TODO handle error
            return Ok(user);
        }
        #endregion

        #region  methods
        [HttpGet("{id}/roles")]
        public async Task<IActionResult> GetRoles(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user == null) return Unauthorized(); //TODO handle error
            return Ok(await _userManager.GetRolesAsync(user));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var userRoles = await _userManager.GetRolesAsync(user);
            if(userRoles.Contains("Admin"))
            {
                return StatusCode(403); //TODO handle error
            }
            if(user == null) return Unauthorized(); //TODO handle error
            await _userManager.DeleteAsync(user);
            return Ok(user);
        }
        #endregion
    }
}