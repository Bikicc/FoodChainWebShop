using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
using FoodChainWebShop.HelperClasses;
namespace FoodChainWebShop.Controllers {
    public class AuthController : ControllerBase {
        private IAuthService _userService;
        public AuthController (IAuthService userService) {
            this._userService = userService;
        }

        [Route ("api/auth/createUser")]
        [HttpPost]
        public async Task<IActionResult> createUser ([FromBody] User user) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            errorMessage error = await _userService.createUser(user);
            if (error != null) {
                return BadRequest(error);
            } else {
                return Ok();
            }
        }

        [Route ("api/auth/loginUser")]
        [HttpPost]
        public async Task<IActionResult> loginUser ([FromBody] User user) {

            User us = await _userService.getUser (user);

            if (us == null) {
                return NotFound ();
            }

            us.Token = _userService.generateJwtToken (us);

            return Ok (us);
        }

    }
}