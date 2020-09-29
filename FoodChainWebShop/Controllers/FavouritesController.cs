using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
using FoodChainWebShop.Interfaces;
namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class FavouritesController : ControllerBase {
        private readonly IFavouritesService _favouritesService; 
            
        public FavouritesController (IFavouritesService service) {
            this._favouritesService = service;
        }

        [Authorize]
        [HttpGet ("{userId}")]
        public async Task<IActionResult> GetFavourites (int userId) {
            return Ok (await _favouritesService.getFavourites(userId));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> postFavourite ([FromBody] Favourite favourite) {
            await _favouritesService.postFavourite(favourite);
            return Ok ();
        }

        [Authorize]
        [HttpDelete ("{userId}/{productId}")]
        public async Task<IActionResult> deleteFavourite (int userId, int productId) {
            await _favouritesService.deleteFavourite(userId, productId);
            return Ok ();
        }
    }
}