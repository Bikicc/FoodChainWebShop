using System;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;

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
        [Authorize ("korisnik")]

        public async Task<IActionResult> PostRestaurantReview ([FromBody] RestaurantReview review) {
            try {
                await _restaurantReviewsService.InsertReview (review);
                return Ok ();
            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }

        [HttpPut]
        [Authorize ("korisnik")]

        public async Task<IActionResult> UpdateRestaurantReview ([FromBody] RestaurantReview review) {
            try {
                await _restaurantReviewsService.UpdateReview (review);
                return Ok ();
            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }
    }
}