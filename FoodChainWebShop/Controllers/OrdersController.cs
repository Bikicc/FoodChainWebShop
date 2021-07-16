using System;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;

namespace FoodChainWebShop.Controllers {
    [ApiController]
    public class OrdersController : ControllerBase {
        private readonly IOrdersService _ordersService;
        public OrdersController (IOrdersService service) {
            this._ordersService = service;
        }

        [Route ("api/orders/getOrders/{userId}")]
        [HttpGet]
        [Authorize ("korisnik")]
        public async Task<IActionResult> GetOrders (int userId) {
            try {
                return Ok (await _ordersService.GetOrders (userId));
            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }
        }

        [Route ("api/orders/getOrders/admin/{datumOd}/{datumDo}")]
        [HttpGet]
        [Authorize ("admin")]
        public async Task<IActionResult> GetOrdersAdmin (DateTime datumOd, DateTime datumDo) {
            try {
                return Ok (await _ordersService.GetOrdersAdmin (datumOd, datumDo));
            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }
        }

        [Route ("api/orders/getOrders/owner/{datumOd}/{datumDo}/{userId}")]
        [HttpGet]
        [Authorize ("vlasnik")]
        public async Task<IActionResult> GetOrdersOwner (DateTime datumOd, DateTime datumDo, int userId) {
            try {
                return Ok (await _ordersService.GetOrdersOwner (datumOd, datumDo, userId));
            } catch (Exception e) {
                Console.WriteLine ($"Exception: {e}");
                return BadRequest ();
            }
        }

        [Route ("api/orders/order")]
        [HttpPost]
        [Authorize ("korisnik")]
        public async Task<IActionResult> postOrders ([FromBody] Order order) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            var res = await _ordersService.postOrders (order);

            return Ok (res);
        }

        [Route ("api/orders/orderProducts")]
        [HttpPost]
        [Authorize ("korisnik")]
        public async Task<IActionResult> postOrderProducts ([FromBody] OrderProduct orderProduct) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            await _ordersService.postOrderProducts (orderProduct);

            return Ok ();
        }

    }
}