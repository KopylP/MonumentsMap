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
using MonumentsMap.Domain.Models;
using MonumentsMap.Entities.ViewModels;
using MonumentsMap.Infrastructure.Persistence;
using MonumentsMap.Infrastructure.UnitOfWork;

namespace MonumentsMap.Data.Services
{
    public class TokenService : ITokenService
    {

        private ApplicationContext _context;
        private IConfiguration _configuration;
        private UserManager<ApplicationUser> _userManager;

        public TokenService(ApplicationContext context, IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<TokenResponseDto> GetTokenAsync(TokenRequestDto model)
        {
            using (var uow = new UnitOfWork(_context))
            {
                try
                {
                    var user = await _userManager.FindByEmailAsync(model.username);
                    if (user == null)
                    {
                        return null;
                    }
                    var rt = CreateRefreshToken(model.client_id, user.Id);
                    await uow.TokenRepository.Add(rt);

                    await uow.SaveAsync();

                    var t = await CreateAccessTokenAsync(user, rt.Value);
                    return t;
                }
                catch
                {
                    return null;
                }
            }
        }

        public async Task<TokenResponseDto> RefreshTokenAsync(TokenRequestDto model)
        {
            using (var uow = new UnitOfWork(_context))
            {
                try
                {
                    var rt = (await uow.TokenRepository.Find(t => t.ClientId == model.client_id && t.Value == model.refresh_token))
                        .FirstOrDefault();
                    if (rt == null) return null;
                    var user = await _userManager.FindByIdAsync(rt.UserId);
                    if (user == null)
                    {
                        return null;
                    }
                    var rtNew = CreateRefreshToken(rt.ClientId, rt.UserId);
                    await uow.TokenRepository.Delete(rt.Id);
                    await uow.TokenRepository.Add(rtNew);

                    await uow.SaveAsync();

                    return await CreateAccessTokenAsync(user, rtNew.Value);
                }
                catch
                {
                    return null;
                }
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
        private async Task<TokenResponseDto> CreateAccessTokenAsync(ApplicationUser user, string refreshToken)
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
            return new TokenResponseDto()
            {
                token = encodedToken,
                expiration = tokenExpirationMins,
                refresh_token = refreshToken
            };
        }
    }
}