using FoodChainWebShop.Models;

namespace FoodChainWebShop.HelperClasses {
    public class RestaurantWithRating {
        public Restaurant restaurant {get; set;}
        public double rating { get; set; }
        public RestaurantWithRating () { }

        public RestaurantWithRating (Restaurant rest, double avgRating) {
            restaurant = rest;
            rating = avgRating;
        }

    }
}