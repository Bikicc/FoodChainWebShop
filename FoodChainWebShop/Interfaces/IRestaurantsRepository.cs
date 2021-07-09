using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
namespace FoodChainWebShop.Interfaces {
    public interface IRestaurantsRepository {
         ICollection<RestaurantWithRating> GetRestaurants ();
    }
}