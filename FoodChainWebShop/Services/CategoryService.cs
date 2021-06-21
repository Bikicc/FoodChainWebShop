using FoodChainWebShop.Interfaces;
using System.Threading.Tasks;
using FoodChainWebShop.Models;
using System.Collections.Generic;

namespace FoodChainWebShop.Services {
    public class CategoryService : ICategoryService {
        private readonly ICategoryRepository _categoryRepo;
        public CategoryService (ICategoryRepository repo) {
            this._categoryRepo = repo;
        }

        public async Task<ICollection<Category>> getCategories (int restaurantId) {
            return await _categoryRepo.getCategories(restaurantId);
        }

        public async Task<Category> GetCategory (int id) {
            return await _categoryRepo.GetCategory(id);
        }
    }
}