using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Controllers {

    [ApiController]
    [Route ("api/[controller]")]
    public class RestaurantReviewsController : ControllerBase {
        private readonly IRestaurantReviewsService _restaurantReviewsService;
        public RestaurantReviewsController (IRestaurantReviewsService service) {
            this._restaurantReviewsService = service;
        }

        [HttpGet ("{restaurantId}")]
        public async Task<IActionResult> GetRestaurantReviews (int restaurantId) {
            return Ok (await _restaurantReviewsService.GetRestaurantReviews (restaurantId));
        }

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> PostRestaurantReview ([FromBody] RestaurantReview review) {
            await _restaurantReviewsService.InsertReview (review);
            return Ok ();
        }

        [HttpPut]
        [Authorize]

        public async Task<IActionResult> UpdateRestaurantReview ([FromBody] RestaurantReview review) {
            await _restaurantReviewsService.UpdateReview (review);
            return Ok ();
        }
    }
}