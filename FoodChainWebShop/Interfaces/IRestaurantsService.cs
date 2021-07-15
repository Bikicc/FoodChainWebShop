using System.Collections.Generic;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace FoodChainWebShop.Interfaces {
    public interface IRestaurantsService {
        ICollection<RestaurantWithRating> GetRestaurants ();
        Task PostRestaurant (Restaurant rest);
        Task<Restaurant> GetRestaurant (int resId);
        Task UpdateRestaurant (Restaurant rest);
        byte[] getByteArrForImage (IFormFile imageFile);
    }
}