using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;
namespace FoodChainWebShop.Data {
    public class DataContext : DbContext {
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            modelBuilder.Entity<OrderProduct> ().HasKey (op => new { op.OrderId, op.ProductId });

            modelBuilder.Entity<Favourite> ().HasKey (f => new { f.UserId, f.ProductId });

            modelBuilder.Entity<RestaurantReview> ().HasKey (rr => new { rr.UserId, rr.RestaurantId });

        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Favourite> Favourites { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<RestaurantReview> RestaurantReviews { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RestaurantType> RestaurantTypes { get; set; }

    }
}