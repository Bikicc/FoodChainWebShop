using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FoodChainWebShop.Interfaces;
namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class ProductController : ControllerBase {
        private readonly IProductService _productService;
        public ProductController (IProductService service) {
            this._productService = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts () {
            return Ok (await _productService.GetProducts());
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetProduct (int id) {

            var product = await _productService.GetProduct(id);

            if (product == null) {
                return NotFound ();
            }

            return Ok (product);
        }
    }
}