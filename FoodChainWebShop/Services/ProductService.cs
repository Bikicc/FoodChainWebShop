using System;
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

        public async Task<ICollection<Product>> GetProducts (int restaurantId) {
            return await _productRepo.GetProducts (restaurantId);
        }

        public async Task<Product> GetProduct (int id) {
            return await _productRepo.GetProduct(id);
        }

        public async Task PostProduct (Product product) {
            try {
                await _productRepo.InsertProduct(product);
            } catch(Exception e) {
                throw e;
            }
        }

    }
}