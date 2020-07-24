using Microsoft.EntityFrameworkCore;
using MonumentsMap.Models;

namespace MonumentsMap.Data
{
    public class ApplicationContext : DbContext
    {
        #region constructor
        public ApplicationContext(DbContextOptions options) : base(options) { }
        #endregion

        #region  props
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
        #endregion
        #region override methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Source>()
                .HasOne(p => p.MonumentPhoto)
                .WithMany(p => p.Sources)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Source>()
                .HasOne(p => p.Monument)
                .WithMany(p => p.Sources)
                .OnDelete(DeleteBehavior.Cascade);
        }
        #endregion
    }
}