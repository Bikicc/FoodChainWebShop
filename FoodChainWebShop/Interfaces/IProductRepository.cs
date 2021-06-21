using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces {
    public interface IProductRepository {
        Task<ICollection<Product>> GetProducts (int restaurantId);
        Task<Product> GetProduct (int id);
    }
}