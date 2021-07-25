using System;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;

namespace FoodChainWebShop.Controllers {
    [ApiController]
    public class UserController : ControllerBase {
        private readonly IUserService _userService;
        public UserController (IUserService service) {
            this._userService = service;
        }

        [Route ("api/owners")]
        [HttpGet]
        public async Task<IActionResult> GetCategories (int restaurantId) {
            return Ok (await _userService.GetOwners ());
        }

        [Route ("api/user")]
        [HttpPut]
        [Authorize ("korisnik")]

        public async Task<IActionResult> UpdateUser ([FromBody] UserDataForUpdate user) {
            errorMessage error = await _userService.UpdateUser (user);

            if (error != null) {
                Console.WriteLine ($"Exception: {error}");
                return BadRequest (error);
            } else {
                return Ok ();
            }
        }
    }
}