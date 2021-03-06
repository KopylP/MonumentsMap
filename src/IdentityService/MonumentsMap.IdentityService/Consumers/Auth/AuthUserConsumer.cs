﻿using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MonumentsMap.Contracts.Auth;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.IdentityService.Contracts.Repositories;
using MonumentsMap.IdentityService.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Consumers.Auth
{
    public class AuthUserConsumer : IConsumer<GetTokenCommand>
    {
        private IConfiguration _configuration;
        private UserManager<ApplicationUser> _userManager;
        private ITokenRepository _tokenRepository; 

        public AuthUserConsumer(IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            ITokenRepository tokenRepository)
        {
            _configuration = configuration;
            _userManager = userManager;
            _tokenRepository = tokenRepository;
        }

        public async Task Consume(ConsumeContext<GetTokenCommand> context)
        {
            var model = context.Message;

            GetTokenResult result;

            switch (model.grant_type)
            {
                case "password":
                    result = await GetTokenAsync(model);
                    break;
                case "refresh_token":
                    result = await RefreshTokenAsync(model);
                    break;
                default:
                    throw new UnauthorizedException("Grant type is invalid");
            }

            await context.RespondAsync(result);
        }

        private async Task<GetTokenResult> GetTokenAsync(GetTokenCommand model)
        {

            var user = await _userManager.FindByEmailAsync(model.username);

            if (user == null)
            {
                throw new UnauthorizedException("Email is incorrect");
            }

            if (!(await _userManager.CheckPasswordAsync(user, model.password)))
            {
                throw new UnauthorizedException("Password is incorrect");
            }

            var rt = CreateRefreshToken(model.client_id, user.Id);
            await _tokenRepository.Add(rt);

            await _tokenRepository.SaveChangeAsync();

            var t = await CreateAccessTokenAsync(user, rt.Value);
            return t;
        }

        private async Task<GetTokenResult> RefreshTokenAsync(GetTokenCommand model)
        {
            try
            {
                var rt = (await _tokenRepository.Find(t => t.ClientId == model.client_id && t.Value == model.refresh_token))
                    .FirstOrDefault();

                if (rt == null) 
                    throw new UnauthorizedException("Refresh token is incorrect");

                var user = await _userManager.FindByIdAsync(rt.UserId);
                if (user == null)
                {
                    throw new UnauthorizedException("Refresh token is incorrect");
                }
                var rtNew = CreateRefreshToken(rt.ClientId, rt.UserId);
                await _tokenRepository.Delete(rt.Id);
                await _tokenRepository.Add(rtNew);

                await _tokenRepository.SaveChangeAsync();

                return await CreateAccessTokenAsync(user, rtNew.Value);
            }
            catch
            {
                throw new UnauthorizedException("Refresh token is incorrect");
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
