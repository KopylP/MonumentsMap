using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Application.Services.User;
using MonumentsMap.Contracts.Exceptions;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Authorize(Roles = "Admin")]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) => _userService = userService;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            UserResponseDto user;
            try
            {
                user = await _userService.GetUserByIdAsync(id);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            return Ok(user);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            UserResponseDto user;
            try
            {
                user = await _userService.DeleteUserAsync(id);
            }
            catch (ProhibitException ex)
            {
                return ForbidResponse(ex.Message);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            return Ok(user);
        }

        [HttpGet("{id}/roles")]
        public async Task<IActionResult> GetRoles(string id)
        {
            IEnumerable<RoleResponseDto> roles;
            try
            {
                roles = await _userService.GetUserRolesAsync(id);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            return Ok(roles);
        }

        [HttpPost("{id}/roles")]
        public async Task<IActionResult> AddRole([FromRoute] string id, [FromBody] UserRoleRequestDto userRoleViewModel)
        {
            UserResponseDto user;
            try
            {
                user = await _userService.ChangeUserRolesAsync(id, userRoleViewModel);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
            }
            catch (BadRequestException ex)
            {
                return BadRequestResponse(ex.Message);
            }
            return Ok(user);
        }

        [HttpDelete("{id}/roles")]
        public async Task<IActionResult> DeleteRole([FromRoute] string id, [FromBody] UserRoleRequestDto userRoleViewModel)
        {
            UserResponseDto user;
            try
            {
                user = await _userService.RemoveUserFromRolesAsync(id, userRoleViewModel);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            catch (ProhibitException ex)
            {
                return ForbidResponse(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
            }
            return Ok(user);
        }
    }
}