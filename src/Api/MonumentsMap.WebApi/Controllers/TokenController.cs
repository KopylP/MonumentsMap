using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Application.Dto.Auth;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Application.Services.Auth;
using MonumentsMap.Application.Services.User;
using MonumentsMap.Contracts.Exceptions;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenServise;
        private readonly IUserService _userService;

        public TokenController(ITokenService tokenService, IUserService userService)
        {
            _tokenServise = tokenService;
            _userService = userService;
        }

        [HttpPost("Auth")]
        public async Task<IActionResult> Auth([FromBody] TokenRequestDto model)
        {
            if (model == null) 
                return BadRequest(new BadRequestError("Model is incorrect"));

            try
            {
                var tokenResponse = await _tokenServise.GetTokenAsync(model);
                return Ok(tokenResponse);
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new UnauthorizedError(ex.Message));
            }
        }

        [HttpGet("Me")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            UserResponseDto user;

            try
            {
                user = await _userService.GetUserByIdAsync(userId);
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new UnauthorizedError(ex.Message));
            }
            
            if (user == null)
                return Unauthorized(new UnauthorizedError());

            return Ok(user);
        }
    }
}