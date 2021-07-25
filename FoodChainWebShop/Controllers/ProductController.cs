using System;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
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
        [Authorize ("vlasnik")]
        public async Task<IActionResult> PostProduct ([FromForm] Product product) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            try {
                if (product.ImageFile != null) {
                    product.Image = _productService.getByteArrForImage (product.ImageFile);
                }

                await _productService.PostProduct (product);
                return Ok ();

            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }

        [Route ("api/product")]
        [HttpPut]
        [Authorize ("vlasnik")]
        public async Task<IActionResult> UpdateProduct ([FromForm] Product product) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            try {
                if (product.ImageFile != null) {
                    product.Image = _productService.getByteArrForImage (product.ImageFile);
                }

                await _productService.UpdateProduct (product);
                return Ok ();

            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }

        [HttpDelete ("api/product/{productId}")]
        [Authorize ("vlasnik")]
        public async Task<IActionResult> DeleteProduct (int productId) {
            try {
                await _productService.DeleteProduct (productId);
                return Ok ();

            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }

        }
    }

}