using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces {
    public interface ICategoryService {
        Task<ICollection<Category>> getCategories (int restaurantId);
        Task<Category> GetCategory (int id);
        Task<ICollection<Category>> GetCategoriesWithoutProducts ();

    }
}