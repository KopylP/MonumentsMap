using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Api.Exceptions;
using MonumentsMap.Contracts.Services;
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
        private readonly IUserService _userService;
        #endregion

        #region constructor
        public UserController(IUserService userService) => _userService = userService;
        #endregion

        #region rest methods
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(users.Select(user => user.AdaptUserToModel()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            UserViewModel user;
            try
            {
                user = await _userService.GetUserByIdAsync(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            return Ok(user);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            ApplicationUser user;
            try
            {
                user = await _userService.DeleteUserAsync(id);
            }
            catch (ProhibitException ex)
            {
                return StatusCode(403, new ForbidError(ex.Message)); 
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message)); 
            }
            return Ok(user);
        }
        #endregion

        #region  methods
        [HttpGet("{id}/roles")]
        public async Task<IActionResult> GetRoles(string id)
        {
            IEnumerable<RoleViewModel> roles;
            try
            {
                roles = await _userService.GetUserRolesAsync(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message)); 
            }
            return Ok(roles);
        }

        [HttpPost("{id}/roles")]
        public async Task<IActionResult> AddRole([FromRoute] string id, [FromBody] UserRoleViewModel userRoleViewModel)
        {
            UserViewModel user;
            try
            {
                user = await _userService.ChangeUserRolesAsync(id, userRoleViewModel);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message)); 
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }
            catch (BadRequestException ex)
            {
                return BadRequest(new BadRequestError(ex.Message)); 
            }
            return Ok(user);
        }

        [HttpDelete("{id}/roles")]
        public async Task<IActionResult> DeleteRole([FromRoute] string id, [FromBody] UserRoleViewModel userRoleViewModel)
        {
            UserViewModel user;
            try
            {
                user = await _userService.RemoveUserFromRolesAsync(id, userRoleViewModel);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message)); 
            }
            catch (ProhibitException ex)
            {
                return StatusCode(403, new ForbidError(ex.Message));
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }
            return Ok(user);
        }
        #endregion
    }
}