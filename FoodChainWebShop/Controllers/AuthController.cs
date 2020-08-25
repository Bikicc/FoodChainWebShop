using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodChainWebShop.authService;
namespace FoodChainWebShop.Controllers {
    public class AuthController : ControllerBase {
        private readonly DataContext _context;
        private IAuthService _userService;
        public AuthController (DataContext context, IAuthService userService) {
            this._context = context;
            this._userService = userService;
        }

        [Route ("api/auth/createUser")]
        [HttpPost]
        public async Task<IActionResult> createUser ([FromBody] User user) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            if (_context.Users.Where (x => x.Username == user.Username).Any ()) {
                var usernameTaken = new { errorId = 1, errorMessage = "Username already taken!" };
                return BadRequest (usernameTaken);
            }

            if (_context.Users.Where (x => x.Email == user.Email).Any ()) {
                var emailTake = new { errorId = 2, errorMessage = "Email already taken!" };
                return BadRequest (emailTake);
            }

            _context.Users.Add (user);
            await _context.SaveChangesAsync ();
            return Ok ();
        }

        [Route ("api/auth/loginUser")]
        [HttpPost]
        public async Task<IActionResult> loginUser ([FromBody] User user) {

            var us = await (from u in this._context.Users where u.Username == user.Username && u.Password == user.Password select u) //(new { UserId = u.UserId, Email = u.Email, Username = u.Username })
                .FirstOrDefaultAsync ();

            if (us == null) {
                return NotFound ();
            }

            us.Token = _userService.generateJwtToken(us);

            return Ok (us);
        }

    }
}