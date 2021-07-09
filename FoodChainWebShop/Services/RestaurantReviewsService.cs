using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Services {
    public class RestaurantReviewsService : IRestaurantReviewsService {
        private readonly IRestaurantReviewsRepository _restaurantReviewsRepo;
        public RestaurantReviewsService (IRestaurantReviewsRepository repo) {
            this._restaurantReviewsRepo = repo;
        }

        public async Task InsertReview (RestaurantReview review) {
            try {
                await _restaurantReviewsRepo.InsertReview (review);
            } catch (Exception e) {

                throw e;
            }
        }

        public async Task UpdateReview (RestaurantReview review) {
            try {
                await _restaurantReviewsRepo.UpdateReview (review);
            } catch (Exception e) {

                throw e;
            }
        }

        public async Task<ICollection<RestaurantReview>> GetRestaurantReviews (int restaurantId) {
            return await _restaurantReviewsRepo.GetRestaurantReviews (restaurantId);

        }
    }
}