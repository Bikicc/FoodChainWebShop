using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FoodChainWebShop.Interfaces;
namespace FoodChainWebShop.Controllers {
    [ApiController]
    public class ProductController : ControllerBase {
        private readonly IProductService _productService;
        public ProductController (IProductService service) {
            this._productService = service;
        }
        
        [Route ("api/products/{restaurantId}")]
        [HttpGet]
        public async Task<IActionResult> GetProducts (int restaurantId) {
            return Ok (await _productService.GetProducts(restaurantId));
        }

        [Route ("api/product/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetProduct (int id) {

            var product = await _productService.GetProduct(id);

            if (product == null) {
                return NotFound ();
            }

            return Ok (product);
        }
    }
}