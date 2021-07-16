using System;
using System.IO;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
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

        [HttpGet ("{resId}")]
        public IActionResult GetRestaurant (int resId) {
            return Ok (_restaurantService.GetRestaurant (resId));
        }

        [HttpGet]
        public IActionResult GetRestaurants () {
            return Ok (_restaurantService.GetRestaurants ());
        }

        [Route ("owner/{userId}")]
        [HttpGet]
        [Authorize ("vlasnik")]
        public IActionResult GetRestaurantsOwner (int userId) {
            return Ok (_restaurantService.GetRestaurantsOwner (userId));
        }

        [Route ("admin")]
        [HttpGet]
        [Authorize ("admin")]
        public IActionResult GetRestaurantsAdmin (int userId) {
            return Ok (_restaurantService.GetRestaurantsAdmin ());
        }

        [HttpPost]
        [Authorize ("admin")]

        public async Task<IActionResult> PostRestaurant ([FromForm] Restaurant rest) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            try {
                if (rest.ImageFile != null) {
                    rest.Image = _restaurantService.getByteArrForImage (rest.ImageFile);
                }

                await _restaurantService.PostRestaurant (rest);
                return Ok ();

            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }

        [HttpPut]
        [Authorize ("admin")]
        public async Task<IActionResult> UpdateRestaurant ([FromForm] Restaurant rest) {
            if (rest.ImageFile != null) {
                rest.Image = _restaurantService.getByteArrForImage (rest.ImageFile);
            }

            await _restaurantService.UpdateRestaurant (rest);
            return Ok ();
        }

        [HttpDelete ("{restId}")]
        [Authorize ("admin")]
        public async Task<IActionResult> DeleteRestaurant (int restId) {
            try {
                await _restaurantService.DeleteRestaurant (restId);
                return Ok ();

            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }

        [Route ("activate/{restId}")]
        [HttpGet]
        [Authorize ("admin")]
        public async Task<IActionResult> ActivateRestaurant (int restId) {
            try {
                await _restaurantService.ActivateRestaurant (restId);
                return Ok ();

            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }
    }
}