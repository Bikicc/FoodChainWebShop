using System.Threading.Tasks;
using FoodChainWebShop.Models;
using System.Collections.Generic;


namespace FoodChainWebShop.Interfaces
{
    public interface IRestaurantReviewsService
    {
        Task InsertReview (RestaurantReview review); 
        Task UpdateReview (RestaurantReview review);
        Task<ICollection<RestaurantReview>> GetRestaurantReviews (int restaurantId); 
    }
}