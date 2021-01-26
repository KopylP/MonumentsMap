using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MonumentsMap.IdentityService.Models;

namespace MonumentsMap.IdentityService.Persistence
{
    public static class DbSeed
    {
        public static void Seed(ApplicationContext applicationContext,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            RolesFeed(roleManager).Wait();
            UsersSeed(userManager, configuration["Superuser:Mail"], configuration["Superuser:Password"]).Wait();
        }

        private static async Task RolesFeed(RoleManager<IdentityRole> roleManager)
        {
            string role_Admin = "Admin";
            string role_Editor = "Editor";
            if (!await roleManager.RoleExistsAsync(role_Admin))
            {
                await roleManager.CreateAsync(new IdentityRole(role_Admin));
            }
            if (!await roleManager.RoleExistsAsync(role_Editor))
            {
                await roleManager.CreateAsync(new IdentityRole(role_Editor));
            }
        }

        private static async Task UsersSeed(UserManager<ApplicationUser> userManager, string mail, string password)
        {
            var user_Admin = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Superuser",
                Email = mail,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                DisplayName = "Superuser"
            };

            if (await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                await userManager.CreateAsync(user_Admin, password);
                await userManager.AddToRoleAsync(user_Admin, "Admin");
                await userManager.AddToRoleAsync(user_Admin, "Editor");
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }
        }
    }
}