using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
using FoodChainWebShop.Interfaces;
namespace FoodChainWebShop.Controllers {
    [ApiController]
    public class OrdersController : ControllerBase {
        private readonly IOrdersService _ordersService;
        public OrdersController (IOrdersService service) {
            this._ordersService = service;
        }

        [Route ("api/orders/getOrders/{userId}")]
        [HttpGet]
        [Authorize(3)]
        public async Task<IActionResult> GetOrders (int userId) {
            return Ok(await _ordersService.GetOrders(userId));
        }

        [Route ("api/orders/order")]
        [HttpPost]
        [Authorize(3)]
        public async Task<IActionResult> postOrders ([FromBody] Order order) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            var res = await _ordersService.postOrders(order);

            return Ok(res);
        }

        [Route ("api/orders/orderProducts")]
        [HttpPost]
        [Authorize(3)]
        public async Task<IActionResult> postOrderProducts ([FromBody] OrderProduct orderProduct) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            } 

            await _ordersService.postOrderProducts(orderProduct);

            return Ok ();
        }

    }
}