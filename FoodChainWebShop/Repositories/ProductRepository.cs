using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Repositories {
    public class ProductRepository : IProductRepository {
        private readonly DataContext _context;
        public ProductRepository (DataContext context) {
            this._context = context;
        }

        public async Task<ICollection<Product>> GetProducts (int restaurantId) {
            return await _context.Products
                .Where (p => p.RestaurantId == restaurantId)
                .ToListAsync ();
        }

        public async Task<Product> GetProduct (int id) {
            return await _context.Products.SingleOrDefaultAsync (x => x.ProductId == id);
        }
    }
}