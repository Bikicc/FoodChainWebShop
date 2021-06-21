using FoodChainWebShop.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace FoodChainWebShop.Interfaces {
    public interface ICategoryRepository {
        Task<ICollection<Category>> getCategories (int restaurantId);
        Task<Category> GetCategory (int id);
    }
}