using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Services {
    public class RestaurantTypeService : IRestaurantsTypeService {
        private readonly IRestaurantTypeRepository _restaurantTypeRepo;

        public RestaurantTypeService (IRestaurantTypeRepository repo) {
            this._restaurantTypeRepo = repo;
        }

        public async Task<ICollection<RestaurantType>> GetRestaurantTypes () {
            return await _restaurantTypeRepo.GetRestaurantTypes ();
        }
    }
}