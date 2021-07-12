using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using System;

namespace FoodChainWebShop.Services {
    public class RestaurantsService : IRestaurantsService {
        private readonly IRestaurantsRepository _restaurantsRepo;

        public RestaurantsService (IRestaurantsRepository repo) {
            this._restaurantsRepo = repo;
        }

        public ICollection<RestaurantWithRating> GetRestaurants () {
            return _restaurantsRepo.GetRestaurants ();
        }

        public async Task PostRestaurant (Restaurant rest) {
            try {
                await _restaurantsRepo.InsertRestaurant (rest);
            } catch (Exception e) {
                throw e;
            }
        }
    }
}