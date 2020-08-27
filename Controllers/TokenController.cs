using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MonumentsMap.Data;
using MonumentsMap.Models;
using MonumentsMap.ViewModels;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        #region private fields
        private ApplicationContext _context;
        private RoleManager<IdentityRole> _roleManager;
        private UserManager<ApplicationUser> _userManager;
        private IConfiguration _configuration;
        #endregion

        #region constructor
        public TokenController(
            ApplicationContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration
        )
        { 
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _configuration = configuration;
        }
        #endregion

        #region methods
        [HttpPost("Auth")]
        public async Task<IActionResult> Auth([FromBody]TokenRequestViewModel model) 
        {
            if (model == null) return new StatusCodeResult(500);

            switch(model.grant_type)
            {
                case "password":
                    return await GetToken(model);
                default:
                    return new UnauthorizedResult(); //TODO handle error
            }
        }
        #endregion

        #region private methods
        private async Task<IActionResult> GetToken(TokenRequestViewModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.username);
                if(user == null) {
                    return new UnauthorizedResult(); //TODO handle error
                }
                DateTime now = DateTime.UtcNow;

                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString())
                };

                var tokenExpirationMins = _configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
                var issurerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["Auth:Jwt:Key"])
                );
                var token = new  JwtSecurityToken(
                    issuer: _configuration["Auth:Jwt:Issuer"],
                    audience: _configuration["Auth:Jwt:Audience"],
                    claims: claims,
                    notBefore: now,
                    expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                    signingCredentials: new SigningCredentials(
                        issurerSigningKey, SecurityAlgorithms.HmacSha256
                    )
                );

                var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
                var response = new TokenResponseViewModel()
                {
                    token = encodedToken,
                    expiration = tokenExpirationMins
                };

                return Ok(response);
            }
            catch
            {
                return new UnauthorizedResult(); //TODO handle error
            }
        }
        #endregion
    }
}