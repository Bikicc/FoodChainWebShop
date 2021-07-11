using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
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

            errorMessage error = await _userService.createUser (user);
            if (error != null) {
                return BadRequest (error);
            } else {
                return Ok ();
            }
        }

        [Route ("api/auth/admin/createUser")]
        [HttpPost]
        [Authorize(1)]
        public async Task<IActionResult> createUserAdmin ([FromBody] User user) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            errorMessage error = await _userService.createUser (user);
            if (error != null) {
                return BadRequest (error);
            } else {
                return Ok ();
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