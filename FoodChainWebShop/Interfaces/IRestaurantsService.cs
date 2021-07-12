using System.Collections.Generic;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Models;
using System.Threading.Tasks;

namespace FoodChainWebShop.Interfaces {
    public interface IRestaurantsService {
        ICollection<RestaurantWithRating> GetRestaurants ();
        Task PostRestaurant (Restaurant rest);
    }
}