using System;
using System.IO;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
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
            return Ok (await _productService.GetProducts (restaurantId));
        }

        [Route ("api/product/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetProduct (int id) {

            var product = await _productService.GetProduct (id);

            if (product == null) {
                return NotFound ();
            }

            return Ok (product);
        }

        [Route ("api/product")]
        [HttpPost]
        public async Task<IActionResult> PostProduct ([FromForm] Product product) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            try {
                var productImage = product.ImageFile.Length;
                var ms = new MemoryStream();
                product.ImageFile.CopyTo(ms);

                var fileBytes = ms.ToArray();
                product.Image = fileBytes;
                
                await _productService.PostProduct (product);
                return Ok ();

            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }
    }
}