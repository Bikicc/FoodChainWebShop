using System.Threading.Tasks;
using FoodChainWebShop.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class CategoryController : ControllerBase {
        private readonly DataContext _context;
        public CategoryController (DataContext context) {
            this._context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories () {
            var categories = await _context.Categories.Include (i => i.Products).ToListAsync ();

            return Ok (categories);
        }
        
        [HttpGet ("{id}")]
        public async Task<IActionResult> GetCategory (int id) {
            var category = await _context.Categories.SingleOrDefaultAsync (x => x.CategoryId == id);

            if (category == null) {
                return NotFound ();
            }

            return Ok (category);
        }
    }
}