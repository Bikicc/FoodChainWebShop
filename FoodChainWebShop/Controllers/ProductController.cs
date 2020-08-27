using System.Threading.Tasks;
using FoodChainWebShop.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class ProductController : ControllerBase {
        private readonly DataContext _context;
        public ProductController (DataContext context) {
            this._context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts () {
            var products = await _context.Products.ToListAsync ();

            return Ok (products);
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetProduct (int id) {

            var product = await _context.Products.SingleOrDefaultAsync (x => x.ProductId == id);

            if (product == null) {
                return NotFound ();
            }

            return Ok (product);
        }
    }
}