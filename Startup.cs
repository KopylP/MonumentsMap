using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MonumentsMap.Data;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.POCO;
using MonumentsMap.Services;
using MonumentsMap.Services.Interfaces;

namespace MonumentsMap
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("WebClientPolicy", builder => {
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
            services.AddScoped<CityLocalizedRepository>();
            services.AddScoped<StatusLocalizedRepository>();
            services.AddScoped<ConditionLocalizedRepository>();
            services.AddScoped<MonumentPhotoLocalizedRepository>();
            services.AddScoped<MonumentLocalizedRepository>();
            services.AddScoped<PhotoRepository>();
            services.AddScoped<PhotoService>();
            services.AddScoped<MonumentPhotoRepository>();
            services.AddScoped<IMonumentPhotoService, MonumentPhotoService>();
            services.AddSingleton(Configuration.GetSection("ImageFilesParams").Get<ImageFilesParams>());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("WebClientPolicy");

            app.UseStaticFiles();

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationContext>();
                context.Database.Migrate();
                var cultures = Configuration.GetSection("SupportedCultures").Get<List<Culture>>();
                DbSeed.Seed(context, cultures);
            }
        }
    }
}
