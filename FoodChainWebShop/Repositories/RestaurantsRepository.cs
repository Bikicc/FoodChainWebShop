using System.Collections.Generic;
using System.Linq;
using FoodChainWebShop.Data;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.HelperClasses;
using System;

namespace FoodChainWebShop.Repositories {
    public class RestaurantsRepository : IRestaurantsRepository {
        private readonly DataContext _context;
        public RestaurantsRepository (DataContext context) {
            this._context = context;
        }

        public ICollection<RestaurantWithRating> GetRestaurants () {
            return (
                (from x in _context.Restaurants.AsEnumerable () join y in _context.RestaurantReviews.AsEnumerable () on x.RestaurantId equals y.RestaurantId into w 
                from resrew in w.DefaultIfEmpty() 
                select new {x, rating = resrew?.rating ?? 0})
                .GroupBy (v => v.x.RestaurantId)
                .Select (m => new RestaurantWithRating(m.FirstOrDefault ().x, Math.Round(m.Average(b => b.rating), 2) ))
            ).ToList ();
        }
    }
}