using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;
using MonumentsMap.Extensions;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        #region private fields
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion
        #region constructor
        public UserController(UserManager<ApplicationUser> userManager) => _userManager = userManager;
        #endregion
        #region rest methods
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _userManager.Users.Select(user => user.AdaptUserToModel()).ToListAsync();
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return Unauthorized(); //TODO handle error
            return Ok(await user.AdaptUserToModelAsync(_userManager));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Contains("Admin"))
            {
                return StatusCode(403); //TODO handle error
            }
            if (user == null) return Unauthorized(); //TODO handle error
            await _userManager.DeleteAsync(user);
            return Ok(user);
        }
        #endregion

        #region  methods
        [HttpGet("{id}/roles")]
        public async Task<IActionResult> GetRoles(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return Unauthorized(); //TODO handle error
            return Ok((await _userManager.GetRolesAsync(user)).Select(p => new RoleViewModel { Name = p }));
        }
        [HttpPatch("Role")]
        public async Task<IActionResult> AddRole(UserRoleViewModel userRoleViewModel)
        {
            var user = await _userManager.FindByIdAsync(userRoleViewModel.UserId);
            if (user == null) return Unauthorized(); //TODO handle error
            var result = await _userManager.AddToRoleAsync(user, userRoleViewModel.RoleName);
            if (!result.Succeeded)
            {
                return StatusCode(500); //TODO handle error
            }
            return Ok(await user.AdaptUserToModelAsync(_userManager));

        }
        [HttpDelete("Role")]
        public async Task<IActionResult> DeleteRole(UserRoleViewModel userRoleViewModel)
        {
            var user = await _userManager.FindByIdAsync(userRoleViewModel.UserId);
            if (user == null) return Unauthorized(); //TODO handle error
            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Contains("Admin"))
            {
                return StatusCode(403); //TODO handle error
            }
            var result = await _userManager.RemoveFromRoleAsync(user, userRoleViewModel.RoleName);
            if (!result.Succeeded)
            {
                return StatusCode(500); //TODO handle error
            }
            return Ok(await user.AdaptUserToModelAsync(_userManager));
        }
        #endregion
    }
}