using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using MonumentsMap.Application.Services.Auth;
using MonumentsMap.Application.Services.Invitation;
using MonumentsMap.Application.Services.Mail;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Application.Services.User;
using MonumentsMap.Core.Services.Monuments;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Data.Services;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Filters;
using MonumentsMap.Framework.Settings;
using MonumentsMap.Infrastructure.Persistence;
using MonumentsMap.Infrastructure.Repositories;

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
                // options.UseSqlite(Configuration.GetConnectionString("SqliteConnection")); 
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddMemoryCache();

            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<IConditionRepository, ConditionRepository>();
            services.AddScoped<IInvitationRepository, InvitationRepository>();
            services.AddScoped<IMonumentPhotoRepository, MonumentPhotoRepository>();
            services.AddScoped<IMonumentRepository, MonumentRepository>();
            services.AddScoped<IParticipantMonumentRepository, ParticipantMonumentRepository>();
            services.AddScoped<IParticipantRepository, ParticipantRepository>();
            services.AddScoped<IStatusRepository, StatusRepository>();
            services.AddScoped<ITokenRepository, TokenRepository>();

            services.AddScoped<IMonumentPhotoService, MonumentPhotoService>();
            services.AddScoped<IMonumentService, MonumentService>();
            services.AddScoped<ICityService, CityService>();
            services.AddScoped<IConditionService, ConditionService>();
            services.AddScoped<IParticipantService, ParticipantService>();
            services.AddScoped<IStatusService, StatusService>();

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IInvitationService, InvitationService>();
            services.AddScoped<IPhotoService, PhotoService>();

            services.AddSingleton(Configuration.GetSection("ImageFilesParams").Get<ImageFilesParams>());
            services.AddScoped<CultureCodeResourceFilter>();
            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
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
            .AddJwtBearer(cfg =>
            {
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

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(name: "v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Monuments Map Api", Version = "v1" });
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

            app.UseSwagger();

            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Monuments Map Api V1");
            });

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
                DbSeed.Seed(context, roleManager, userManager, cultures, Configuration);
            }
        }
    }
}