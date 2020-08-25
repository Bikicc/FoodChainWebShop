using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace FoodChainWebShop.Controllers {
    [ApiController]
    public class OrdersController : ControllerBase {
        private readonly DataContext _context;
        public OrdersController (DataContext context) {
            this._context = context;
        }

        [Route ("api/orders/getOrders/{userId}")]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOrders (int userId) {

            var ord = await (_context.Orders
                .Select (order => new {
                    OrderId = order.OrderId,
                        Price = order.Price,
                        OrderTime = order.OrderTime,
                        Note = order.Note,
                        Address = order.Address,
                        UserId = order.UserId,
                        Products = order.OrderProduct.Where (op => op.OrderId == order.OrderId)
                        .Select (p => new {
                            productId = p.Product.ProductId,
                                name = p.Product.Name,
                                price = p.Product.Price,
                                imageName = p.Product.ImageName,
                                quantity = p.Quantity
                        })
                }).Where (o => o.UserId == userId).ToListAsync ());

            return Ok (ord);
        }

        [Route ("api/orders/order")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> postOrders ([FromBody] Order order) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            _context.Orders.Add (order);
            await _context.SaveChangesAsync ();

            return Ok (new { OrderId = order.OrderId });
        }

        [Route ("api/orders/orderProducts")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> postOrderProducts ([FromBody] OrderProduct orderProduct) {

            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            _context.OrderProducts.Add (orderProduct);
            await _context.SaveChangesAsync ();

            return Ok ();
        }

    }
}