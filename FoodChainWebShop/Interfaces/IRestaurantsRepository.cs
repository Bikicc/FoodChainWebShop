using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces {
    public interface IRestaurantsRepository {
        ICollection<RestaurantWithRating> GetRestaurants ();
        Task InsertRestaurant (Restaurant rest);
        Task<Restaurant> GetRestaurant (int resId);
        Task UpdateRestaurant (Restaurant rest);

    }
}