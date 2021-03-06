using FoodChainWebShop.authService;
using FoodChainWebShop.Data;
using FoodChainWebShop.EmailService;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Repositories;
using FoodChainWebShop.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
namespace FoodChainWebShop {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddCors ();

            var emailConfig = Configuration
                .GetSection ("EmailConfiguration")
                .Get<EmailConfiguration> ();
            services.AddSingleton (emailConfig);

            services.Configure<AppSettings> (Configuration.GetSection ("AppSettings"));

            //Services
            services.AddScoped<IEmailSender, EmailSenderService> ();
            services.AddScoped<IAuthService, AuthService> ();
            services.AddScoped<ICategoryService, CategoryService> ();
            services.AddScoped<IFavouritesService, FavouritesService> ();
            services.AddScoped<IProductService, ProductService> ();
            services.AddScoped<IOrdersService, OrdersService> ();
            services.AddScoped<IRestaurantsService, RestaurantsService> ();
            services.AddScoped<IRestaurantsTypeService, RestaurantTypeService> ();
            services.AddScoped<IRestaurantReviewsService, RestaurantReviewsService> ();
            services.AddScoped<IUserService, UserService> ();

            //Repositories
            services.AddScoped<IAuthRepository, AuthRepository> ();
            services.AddScoped<ICategoryRepository, CategoryRepository> ();
            services.AddScoped<IFavouritesRepository, FavouritesRepository> ();
            services.AddScoped<IProductRepository, ProductRepository> ();
            services.AddScoped<IOrdersRepository, OrdersRepository> ();
            services.AddScoped<IRestaurantsRepository, RestaurantsRepository> ();
            services.AddScoped<IRestaurantTypeRepository, RestaurantTypeRepository> ();
            services.AddScoped<IRestaurantReviewsRepository, RestaurantReviewsRepository> ();
            services.AddScoped<IUserRepository, UserRepository> ();

            services.AddDbContext<DataContext> (x => x.UseSqlite (Configuration.GetConnectionString ("DefaultConnection")));

            services.AddControllersWithViews ()
                .AddNewtonsoftJson (options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles (configuration => {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseExceptionHandler ("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts ();
            }

            app.UseCors (
                options => options.WithOrigins ("http://localhost:4200")
                .AllowAnyMethod ()
                .AllowAnyHeader ()
            );

            app.UseMiddleware<JwtMiddleware> ();

            app.UseHttpsRedirection ();
            app.UseStaticFiles ();
            if (!env.IsDevelopment ()) {
                app.UseSpaStaticFiles ();
            }

            app.UseRouting ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllerRoute (
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa (spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment ()) {
                    spa.UseAngularCliServer (npmScript: "start");
                }
            });
        }
    }
}