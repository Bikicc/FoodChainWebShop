using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Z.EntityFramework.Plus;
namespace FoodChainWebShop.Repositories {
    public class CategoryRepository : ICategoryRepository {
        private readonly DataContext _context;

        public CategoryRepository (DataContext context) {
            this._context = context;
            
        }
        public async Task<ICollection<Category>> GetCategoriesWithoutProducts () {
            return await _context.Categories.ToListAsync ();
        }
        public async Task<ICollection<Category>> getCategories (int restaurantId) {
            return await _context.Categories
                .IncludeFilter (i => i.Products.Where (p => p.RestaurantId == restaurantId))
                .ToListAsync ();
        }

        public async Task<Category> GetCategory (int id) {
            return await _context.Categories.SingleOrDefaultAsync (x => x.CategoryId == id);
        }
    }
}