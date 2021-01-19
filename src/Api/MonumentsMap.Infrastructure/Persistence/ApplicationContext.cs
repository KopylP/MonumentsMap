using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using MonumentsMap.Framework.Enums.Monuments;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Infrastructure.Persistence
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext(DbContextOptions options) : base(options) { }

        public DbSet<City> Cities { get; set; }
        public DbSet<Condition> Conditions { get; set; }
        public DbSet<Culture> Cultures { get; set; }
        public DbSet<Localization> Localizations { get; set; }
        public DbSet<LocalizationSet> LocalizationSets { get; set; }
        public DbSet<Monument> Monuments { get; set; }
        public DbSet<MonumentPhoto> MonumentPhotos { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Source> Sources { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<ParticipantMonument> ParticipantMonuments { get; set; }
        public DbSet<Invitation> Invitations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Source>()
                .HasOne(p => p.MonumentPhoto)
                .WithMany(p => p.Sources)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Source>()
                .HasOne(p => p.Monument)
                .WithMany(p => p.Sources)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Monument>()
                .Property(p => p.Period)
                .HasConversion(v => v.ToString(),
                    v => (Period)Enum.Parse(typeof(Period), v));

            modelBuilder.Entity<Monument>()
                .Property(p => p.DestroyPeriod)
                .HasConversion(v => v.ToString(),
                    v => (Period)Enum.Parse(typeof(Period), v));

            modelBuilder.Entity<Monument>()
                .HasIndex(p => p.Slug)
                .IsUnique();

            modelBuilder.Entity<MonumentPhoto>()
                .Property(p => p.Period)
                .HasConversion(v => v.ToString(),
                    v => (Period)Enum.Parse(typeof(Period), v));

            modelBuilder.Entity<Condition>()
                .HasIndex(p => p.Abbreviation)
                .IsUnique();
            
            modelBuilder.Entity<Status>()
                .HasIndex(p => p.Abbreviation)
                .IsUnique();

            modelBuilder.Entity<Participant>()
                .HasIndex(p => p.DefaultName)
                .IsUnique();
        }
    }
}