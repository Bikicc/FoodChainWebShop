using FoodChainWebShop.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace FoodChainWebShop.Interfaces {
    public interface ICategoryService {
        Task<ICollection<Category>> getCategories ();
        Task<Category> GetCategory (int id);
    }
}