using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.IdentityService.Models;
using System;

namespace MonumentsMap.IdentityService.Persistence
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext(DbContextOptions options) : base(options) { }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
    }
}