using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class FavouritesController : ControllerBase {
        private readonly DataContext _context;
        public FavouritesController (DataContext context) {
            this._context = context;
        }

        [HttpGet ("{userId}")]
        public async Task<IActionResult> GetFavourites (int userId) {

            var favourites = await (from product in _context.Products
            where product.Favourites.Any (p => p.UserId == userId)
            select new {productId = product.ProductId, name = product.Name, price = product.Price, imageName = product.ImageName}).ToListAsync();

            return Ok (favourites);
        }

        [HttpPost]
        public async Task<IActionResult> postFavourite ([FromBody] Favourite favourite) {
            _context.Favourites.Add (favourite);
            await _context.SaveChangesAsync ();
            return Ok ();
        }

        [HttpDelete ("{userId}/{productId}")]
        public async Task<IActionResult> deleteFavourite (int userId, int productId) {
            var favourite = await _context.Favourites.FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);
            
            if (favourite == null) {
                return BadRequest("Favourite doesn't exists!");
            }
            _context.Favourites.Remove(favourite);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}