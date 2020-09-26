using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Contracts.Services;
using MonumentsMap.Data;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Data.Services;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.Settings;
using MonumentsMap.Filters;

namespace MonumentsMap
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;

        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("WebClientPolicy", builder =>
            {
                builder.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
            }));
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddDbContext<ApplicationContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddMemoryCache();
            services.AddScoped<ICityLocalizedRepository, CityLocalizedRepository>();
            services.AddScoped<IStatusLocalizedRepository, StatusLocalizedRepository>();
            services.AddScoped<IConditionLocalizedRepository, ConditionLocalizedRepository>();
            services.AddScoped<IMonumentPhotoLocalizedRepository, MonumentPhotoLocalizedRepository>();
            services.AddScoped<IMonumentLocalizedRepository, MonumentLocalizedRepository>();
            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<PhotoService>();
            services.AddScoped<IMonumentPhotoRepository, MonumentPhotoRepository>();
            services.AddScoped<IMonumentPhotoService, MonumentPhotoService>();
            services.AddScoped<IMonumentRepository, MonumentRepository>();
            services.AddScoped<IMonumentService, MonumentService>();
            services.AddSingleton(Configuration.GetSection("ImageFilesParams").Get<ImageFilesParams>());
            services.AddScoped<CultureCodeResourceFilter>();
            services.AddScoped<ITokenRepository, TokenRepository>();
            services.AddScoped<IParticipantLocalizedRepository, ParticipantLocalizedRepository>();
            services.AddScoped<ITokenService, TokenService>();
            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
            services.AddScoped<IInvitationRepository, InvitationRepository>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IInvitationService, InvitationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IParticipantMonumentRepository, ParticipantMonumentRepository>();
            //idenditiy
            services.AddIdentity<ApplicationUser, IdentityRole>(opts =>
            {
                opts.Password.RequireDigit = true;
                opts.Password.RequireLowercase = true;
                opts.Password.RequireUppercase = true;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequiredLength = 7;
            }).AddEntityFrameworkStores<ApplicationContext>();
            services.AddAuthentication(opts => 
            {
                opts.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(cfg => {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidIssuer = Configuration["Auth:Jwt:Issuer"],
                    ValidAudience = Configuration["Auth:Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"])
                    ),
                    ClockSkew = TimeSpan.Zero,
                    RequireExpirationTime = true,
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = true
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {

            app.UseExceptionHandler("/errors/500");

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("WebClientPolicy");

            app.UseStaticFiles();

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationContext>();
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
                context.Database.Migrate();
                var cultures = Configuration.GetSection("SupportedCultures").Get<List<Culture>>();
                DbSeed.Seed(context, roleManager, userManager, cultures);
            }
        }
    }
}
