using FoodChainWebShop.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class RestaurantsController : ControllerBase {
        private readonly IRestaurantsService _restaurantService;

        public RestaurantsController (IRestaurantsService service) {
            this._restaurantService = service;
        }
       
        [HttpGet]
        public IActionResult GetRestaurants () {
            return Ok ( _restaurantService.GetRestaurants ());
        }

    }
}