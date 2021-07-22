using System;
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
                .Where (p => p.RestaurantId == restaurantId && p.Deleted == false)
                .ToListAsync ();
        }

        public async Task<Product> GetProduct (int id) {
            return await _context.Products.SingleOrDefaultAsync (x => x.ProductId == id);
        }

        public async Task InsertProduct (Product product) {
            try {
                _context.Products.Add (product);
                await _context.SaveChangesAsync ();
            } catch (Exception e) {
                throw e;
            }

        }

        public async Task UpdateProduct (Product product) {
            try {
                _context.Products.Update (product);
                await _context.SaveChangesAsync ();
            } catch (Exception e) {
                throw e;
            }
        }

        public async Task DeleteProduct (int productId) {
            try {
                var prod = await _context.Products.SingleOrDefaultAsync (p => p.ProductId == productId);
                prod.Deleted = true;
                await _context.SaveChangesAsync ();
            } catch (Exception e) {
                throw e;
            }
        }
    }
}