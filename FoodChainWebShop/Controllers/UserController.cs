using System.Threading.Tasks;
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
            
            return Ok (await _userService.GetOwners());
        }
    }
}