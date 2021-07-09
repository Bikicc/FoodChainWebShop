using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces {
    public interface IRestaurantReviewsRepository {
        Task InsertReview (RestaurantReview review);
        Task<ICollection<RestaurantReview>> GetRestaurantReviews (int restaurantId);
        Task UpdateReview (RestaurantReview review);
    }
}