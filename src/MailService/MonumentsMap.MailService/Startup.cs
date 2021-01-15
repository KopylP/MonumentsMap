using MassTransit;
using MassTransit.Definition;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using MonumentsMap.Contracts;
using MonumentsMap.MailService.Consumers;
using MonumentsMap.MailService.Models;

namespace MonumentsMap.MailService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;

        }
        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHealthChecks();

            services.TryAddSingleton(KebabCaseEndpointNameFormatter.Instance);

            services.AddScoped<Services.MailService>();
            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));

            services.AddMassTransit(config =>
            {
                config.AddConsumer<SendMailConsumer>(conf => 
                {
                    
                });
                config.AddBus(context => Bus.Factory.CreateUsingRabbitMq(c =>
                {
                    c.UseHealthCheck(context);
                    c.Host(Configuration.GetValue("RabbitHost", "rabbitmq://localhost"));
                    
                    c.ReceiveEndpoint(RebbitMqMassTransitConstants.SendMailQueue, cs =>
                    {
                        cs.ConfigureConsumer<SendMailConsumer>(context);
                    });
                }));
            });

            services.AddMassTransitHostedService();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("This is mail service.");
                });

                endpoints.MapHealthChecks("/health/ready", new HealthCheckOptions()
                {
                    Predicate = (check) => check.Tags.Contains("ready"),
                });

                endpoints.MapHealthChecks("/health/live", new HealthCheckOptions()
                {
                    Predicate = (_) => false
                });
            });
        }
    }
}
