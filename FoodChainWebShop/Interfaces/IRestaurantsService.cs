using System.Collections.Generic;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace FoodChainWebShop.Interfaces {
    public interface IRestaurantsService {
        ICollection<RestaurantWithRating> GetRestaurants ();
        ICollection<RestaurantWithRating> GetRestaurantsOwner (int userId);
        ICollection<RestaurantWithRating> GetRestaurantsAdmin ();
        Task PostRestaurant (Restaurant rest);
        Task<Restaurant> GetRestaurant (int resId);
        Task UpdateRestaurant (Restaurant rest);
        Task DeleteRestaurant (int restId);
        Task ActivateRestaurant (int restId);
        byte[] getByteArrForImage (IFormFile imageFile);
    }
}