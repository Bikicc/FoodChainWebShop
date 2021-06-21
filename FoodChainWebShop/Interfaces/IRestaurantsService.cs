using System.Collections.Generic;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Interfaces {
    public interface IRestaurantsService {
        ICollection<RestaurantWithRating> GetRestaurants ();
    }
}