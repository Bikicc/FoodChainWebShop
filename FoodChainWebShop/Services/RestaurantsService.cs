using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace FoodChainWebShop.Services {
    public class RestaurantsService : IRestaurantsService {
        private readonly IRestaurantsRepository _restaurantsRepo;

        public RestaurantsService (IRestaurantsRepository repo) {
            this._restaurantsRepo = repo;
        }

        public ICollection<RestaurantWithRating> GetRestaurants () {
            return _restaurantsRepo.GetRestaurants ();
        }

        public async Task<Restaurant> GetRestaurant (int resId) {
            return await _restaurantsRepo.GetRestaurant (resId);
        }
        public async Task PostRestaurant (Restaurant rest) {
            try {
                await _restaurantsRepo.InsertRestaurant (rest);
            } catch (Exception e) {
                throw e;
            }
        }

        public async Task UpdateRestaurant (Restaurant rest) {
            try {
                await _restaurantsRepo.UpdateRestaurant (rest);
            } catch (Exception e) {
                throw e;
            }
        }

        public byte[] getByteArrForImage (IFormFile imageFile) {
            var image = imageFile.Length;
            var ms = new MemoryStream ();
            imageFile.CopyTo (ms);

            var fileBytes = ms.ToArray ();
            return fileBytes;
        }
    }
}