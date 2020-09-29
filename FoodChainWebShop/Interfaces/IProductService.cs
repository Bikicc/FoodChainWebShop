using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces
{
    public interface IProductService
    {
         Task<ICollection<Product>> GetProducts();
         Task<Product> GetProduct (int id);
    }
}