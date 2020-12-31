using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Application.Services.Auth;
using MonumentsMap.Domain.Models;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenServise;
        private readonly UserManager<ApplicationUser> _userManager;

        public TokenController(ITokenService tokenService, UserManager<ApplicationUser> userManager)
        {
            _tokenServise = tokenService;
            _userManager = userManager;
        }

        [HttpPost("Auth")]
        public async Task<IActionResult> Auth([FromBody] TokenRequestDto model)
        {
            if (model == null) 
                return BadRequest(new BadRequestError("Model is incorrect"));

            TokenResponseDto tokenResponse = null;
            switch (model.grant_type)
            {
                case "password":
                    tokenResponse = await _tokenServise.GetTokenAsync(model);
                    break;
                case "refresh_token":
                    tokenResponse = await _tokenServise.RefreshTokenAsync(model);
                    break;
                default:
                    return Unauthorized(new UnauthorizedError());
            }

            if (tokenResponse == null) 
                return Unauthorized(new UnauthorizedError());

            return Ok(tokenResponse);
        }

        [HttpGet("Me")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            var user = await _userManager.GetUserAsync(User);
            
            if (user == null)
             return Unauthorized(new UnauthorizedError());

            return Ok(await user.AdaptUserToModelAsync(_userManager));
        }
    }
}