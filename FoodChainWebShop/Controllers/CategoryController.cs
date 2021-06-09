using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class CategoryController : ControllerBase {
        private readonly ICategoryService _categoryService;
        public CategoryController (ICategoryService service) {
            this._categoryService = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories () {
            
            return Ok (await _categoryService.getCategories());
        }
        
        [HttpGet ("{id}")]
        public async Task<IActionResult> GetCategory (int id) {
            Category category = await _categoryService.GetCategory(id);

            if (category == null) {
                return NotFound ();
            }
            return Ok (category);
        }
    }
}