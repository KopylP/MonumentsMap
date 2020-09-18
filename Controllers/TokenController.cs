using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Contracts.Services;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;
using MonumentsMap.Extensions;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        #region private fields
        private readonly ITokenService _tokenServise;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region constructor
        public TokenController(ITokenService tokenService, UserManager<ApplicationUser> userManager)
        {
            _tokenServise = tokenService;
            _userManager = userManager;
        }
        #endregion

        #region methods
        [HttpPost("Auth")]
        public async Task<IActionResult> Auth([FromBody] TokenRequestViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);
            TokenResponseViewModel tokenResponse = null;
            switch (model.grant_type)
            {
                case "password":
                    tokenResponse = await _tokenServise.GetTokenAsync(model);
                    break;
                case "refresh_token":
                    tokenResponse = await _tokenServise.RefreshTokenAsync(model);
                    break;
                default:
                    return new UnauthorizedResult(); //TODO handle error
            }
            if (tokenResponse == null) return new UnauthorizedResult(); //TODO handle error
            return Ok(tokenResponse);
        }

        [HttpGet("Me")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized(); //TODO handle error
            return Ok(await user.AdaptUserToModelAsync(_userManager));
        }
        #endregion
    }
}