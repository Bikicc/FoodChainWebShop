using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces
{
    public interface IProductService
    {
         Task<ICollection<Product>> GetProducts(int restaurantId);
         Task<Product> GetProduct (int id);

         Task PostProduct(Product product);
    }
}