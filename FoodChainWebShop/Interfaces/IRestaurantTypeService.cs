using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Interfaces
{
    public interface IRestaurantsTypeService
    {
        Task<ICollection<RestaurantType>> GetRestaurantTypes();
    }
}