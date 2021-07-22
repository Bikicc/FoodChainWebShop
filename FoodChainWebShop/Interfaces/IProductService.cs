using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Http;

namespace FoodChainWebShop.Interfaces {
    public interface IProductService {
        Task<ICollection<Product>> GetProducts (int restaurantId);
        Task<Product> GetProduct (int id);
        Task PostProduct (Product product);
        byte[] getByteArrForImage (IFormFile imageFile);
        Task UpdateProduct (Product product);
        Task DeleteProduct (int productId);

    }
}