using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Services {
    public class CategoryService : ICategoryService {
        private readonly ICategoryRepository _categoryRepo;
        public CategoryService (ICategoryRepository repo) {
            this._categoryRepo = repo;
        }
        
        public async Task<ICollection<Category>> GetCategoriesWithoutProducts () {
            return await _categoryRepo.GetCategoriesWithoutProducts ();
        }
        public async Task<ICollection<Category>> getCategories (int restaurantId) {
            return await _categoryRepo.getCategories (restaurantId);
        }

        public async Task<Category> GetCategory (int id) {
            return await _categoryRepo.GetCategory (id);
        }
    }
}