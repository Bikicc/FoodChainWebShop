using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces {
    public interface IRestaurantsRepository {
        ICollection<RestaurantWithRating> GetRestaurants ();
        ICollection<RestaurantWithRating> GetRestaurantsOwner (int userId);
        ICollection<RestaurantWithRating> GetRestaurantsAdmin ();
        Task InsertRestaurant (Restaurant rest);
        Task<Restaurant> GetRestaurant (int resId);
        Task UpdateRestaurant (Restaurant rest);
        Task DeleteRestaurant (int restId);
        Task ActivateRestaurant (int restId);

    }
}