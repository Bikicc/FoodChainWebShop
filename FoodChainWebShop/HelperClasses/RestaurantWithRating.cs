using FoodChainWebShop.Models;

namespace FoodChainWebShop.HelperClasses {
    public class RestaurantWithRating {
        public Restaurant restaurantInfo {get; set;}
        public double rating { get; set; }
        public RestaurantWithRating () { }

        public RestaurantWithRating (Restaurant restaurant, double avgRating) {
            restaurantInfo = restaurant;
            rating = avgRating;
        }

    }
}