using FoodChainWebShop.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class RestaurantTypeController : ControllerBase {
        private readonly IRestaurantsTypeService _restaurantTypeService;

        public RestaurantTypeController (IRestaurantsTypeService service) {
            this._restaurantTypeService = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetRestaurantType () {
            return Ok (await _restaurantTypeService.GetRestaurantTypes());
        }

    }
}