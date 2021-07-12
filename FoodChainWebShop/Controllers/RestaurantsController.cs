using System;
using System.IO;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
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
            return Ok (_restaurantService.GetRestaurants ());
        }

        public async Task<IActionResult> PostRestaurant ([FromForm] Restaurant rest) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            try {
                var resImage = rest.ImageFile.Length;
                var ms = new MemoryStream ();
                rest.ImageFile.CopyTo (ms);

                var fileBytes = ms.ToArray ();
                rest.Image = fileBytes;

                await _restaurantService.PostRestaurant (rest);
                return Ok ();

            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }

    }
}