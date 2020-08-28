using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Services.Interfaces;
using MonumentsMap.ViewModels;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        #region private fields
        private ITokenService _tokenServise;
        #endregion

        #region constructor
        public TokenController(ITokenService tokenService) => _tokenServise = tokenService;
        #endregion

        #region methods
        [HttpPost("Auth")]
        public async Task<IActionResult> Auth([FromBody]TokenRequestViewModel model) 
        {
            if (model == null) return new StatusCodeResult(500);
            TokenResponseViewModel tokenResponse = null;
            switch(model.grant_type)
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
            if(tokenResponse == null) return new UnauthorizedResult(); //TODO handle error
            return Ok(tokenResponse);
        }
        #endregion
    }
}