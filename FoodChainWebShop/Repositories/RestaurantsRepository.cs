using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Repositories {
    public class RestaurantsRepository : IRestaurantsRepository {
        private readonly DataContext _context;
        public RestaurantsRepository (DataContext context) {
            this._context = context;
        }

        public async Task<Restaurant> GetRestaurant (int resId) {
            return await _context.Restaurants.SingleOrDefaultAsync (r => r.RestaurantId == resId);
        }

        public ICollection<RestaurantWithRating> GetRestaurants () {
            return (
                (from x in _context.Restaurants.AsEnumerable () join y in _context.RestaurantReviews.AsEnumerable () on x.RestaurantId equals y.RestaurantId into w from resrew in w.DefaultIfEmpty () select new { x, rating = resrew?.rating ?? 0 })
                .GroupBy (v => v.x.RestaurantId)
                .Select (m => new RestaurantWithRating (m.FirstOrDefault ().x, Math.Round (m.Average (b => b.rating), 2)))
                // .Where (rw => rw.restaurant.Active == true)
            ).ToList ();
        }

        public async Task InsertRestaurant (Restaurant rest) {
            try {
                _context.Restaurants.Add (rest);
                await _context.SaveChangesAsync ();
            } catch (Exception e) {
                throw e;
            }

        }

        public async Task UpdateRestaurant (Restaurant rest) {
            try {
                _context.Restaurants.Update (rest);
                await _context.SaveChangesAsync ();
            } catch (Exception e) {
                throw e;
            }
        }

        public async Task DeleteRestaurant (int restId) {
            try {
                var rest = await _context.Restaurants.SingleOrDefaultAsync (r => r.RestaurantId == restId);
                rest.Active = false;
                await _context.SaveChangesAsync ();
            } catch (Exception e) {
                throw e;
            }
        }

        public async Task ActivateRestaurant (int restId) {
            try {
                var rest = await _context.Restaurants.SingleOrDefaultAsync (r => r.RestaurantId == restId);
                rest.Active = true;
                await _context.SaveChangesAsync ();
            } catch (Exception e) {
                throw e;
            }
        }
    }
}