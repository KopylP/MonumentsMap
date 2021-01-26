using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MonumentsMap.Application.Services.Auth;
using MonumentsMap.Contracts.Auth;
using MonumentsMap.IdentityService.Contracts.Repositories;
using MonumentsMap.IdentityService.Models;

namespace MonumentsMap.IdentityService.Application.Services.Auth
{
    public class TokenService : ITokenService
    {

        private IConfiguration _configuration;
        private UserManager<ApplicationUser> _userManager;
        private ITokenRepository _tokenRepository;

        public TokenService(IConfiguration configuration, UserManager<ApplicationUser> userManager, ITokenRepository tokenRepository)
        {
            _configuration = configuration;
            _userManager = userManager;
            _tokenRepository = tokenRepository;
        }

        public async Task<GetTokenResult> GetTokenAsync(GetTokenCommand model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.username);
                if (user == null)
                {
                    return null;
                }
                var rt = CreateRefreshToken(model.client_id, user.Id);
                await _tokenRepository.Add(rt);

                await _tokenRepository.SaveChangeAsync();

                var t = await CreateAccessTokenAsync(user, rt.Value);
                return t;
            }
            catch
            {
                return null;
            }
        }

        public async Task<GetTokenResult> RefreshTokenAsync(GetTokenCommand model)
        {
            try
            {
                var rt = (await _tokenRepository.Find(t => t.ClientId == model.client_id && t.Value == model.refresh_token))
                    .FirstOrDefault();
                if (rt == null) return null;
                var user = await _userManager.FindByIdAsync(rt.UserId);
                if (user == null)
                {
                    return null;
                }
                var rtNew = CreateRefreshToken(rt.ClientId, rt.UserId);
                await _tokenRepository.Delete(rt.Id);
                await _tokenRepository.Add(rtNew);

                await _tokenRepository.SaveChangeAsync();

                return await CreateAccessTokenAsync(user, rtNew.Value);
            }
            catch
            {
                return null;
            }
        }

        private Token CreateRefreshToken(string clientId, string userId)
        {
            return new Token()
            {
                ClientId = clientId,
                UserId = userId,
                Type = 0,
                Value = Guid.NewGuid().ToString("N")
            };
        }
        private async Task<GetTokenResult> CreateAccessTokenAsync(ApplicationUser user, string refreshToken)
        {
            DateTime now = DateTime.UtcNow;

            var claims = new List<Claim> {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString())
                };
            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenExpirationMins = _configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
            var issurerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Auth:Jwt:Key"])
            );

            var token = new JwtSecurityToken(
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
            return new GetTokenResult()
            {
                token = encodedToken,
                expiration = tokenExpirationMins,
                refresh_token = refreshToken
            };
        }
    }
}