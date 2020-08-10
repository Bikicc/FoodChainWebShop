using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;
namespace FoodChainWebShop.Data {
    public class DataContext : DbContext {
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            modelBuilder.Entity<OrderProduct>().HasKey (op => new { op.OrderId, op.ProductId });

            modelBuilder.Entity<Favourite>().HasKey (f => new { f.UserId, f.ProductId });
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Favourite> Favourites { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Category> Categories { get; set; }

    }
}