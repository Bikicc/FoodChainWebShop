using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
namespace FoodChainWebShop.Controllers {
    [ApiController]
    public class CategoryController : ControllerBase {
        private readonly ICategoryService _categoryService;
        public CategoryController (ICategoryService service) {
            this._categoryService = service;
        }

        [Route ("api/categories")]
        [HttpGet]
        public async Task<IActionResult> GetCategoriesWithoutProducts () {

            return Ok (await _categoryService.GetCategoriesWithoutProducts ());
        }

        [Route ("api/category/products/{restaurantId}")]
        [HttpGet]
        public async Task<IActionResult> GetCategories (int restaurantId) {

            return Ok (await _categoryService.getCategories (restaurantId));
        }

        [Route ("api/category/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetCategory (int id) {
            Category category = await _categoryService.GetCategory (id);

            if (category == null) {
                return NotFound ();
            }
            return Ok (category);
        }
    }
}