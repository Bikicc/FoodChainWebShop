using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Repositories {
    public class RestaurantReviewsRepository : IRestaurantReviewsRepository {
        private readonly DataContext _context;

        public RestaurantReviewsRepository (DataContext context) {
            this._context = context;
        }

        public async Task<ICollection<RestaurantReview>> GetRestaurantReviews (int restaurantId) {
            return await _context.RestaurantReviews
                .Where (rw => rw.RestaurantId == restaurantId)
                .Include (rw => rw.User)
                .ToListAsync ();
        }

        public async Task InsertReview (RestaurantReview review) {
            try {
                _context.RestaurantReviews.Add (review);
                await _context.SaveChangesAsync ();
            } catch (Exception e) {
                throw e;
            }

        }

        public async Task UpdateReview (RestaurantReview review) {
            try {
                _context.RestaurantReviews.Update(review);
                await _context.SaveChangesAsync ();
            } catch (Exception e) {
                throw e;
            }

        }
    }
}