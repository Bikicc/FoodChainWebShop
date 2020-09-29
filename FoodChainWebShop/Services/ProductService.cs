using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Services {
    public class ProductService : IProductService {
        private readonly IProductRepository _productRepo;

        public ProductService (IProductRepository repo) {
            this._productRepo = repo;
        }

        public async Task<ICollection<Product>> GetProducts () {
            return await _productRepo.GetProducts ();
        }

        public async Task<Product> GetProduct (int id) {
            return await _productRepo.GetProduct(id);
        }

    }
}