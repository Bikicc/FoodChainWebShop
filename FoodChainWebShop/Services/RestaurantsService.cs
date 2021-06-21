using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Services {
    public class RestaurantsService : IRestaurantsService {
        private readonly IRestaurantsRepository _restaurantsRepo;

        public RestaurantsService (IRestaurantsRepository repo) {
            this._restaurantsRepo = repo;
        }

        public ICollection<RestaurantWithRating> GetRestaurants () {
            return _restaurantsRepo.GetRestaurants ();
        }
    }
}