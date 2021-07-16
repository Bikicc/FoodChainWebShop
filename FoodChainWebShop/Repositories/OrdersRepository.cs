using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Repositories {
    public class OrdersRepository : IOrdersRepository {
        private readonly DataContext _context;
        public OrdersRepository (DataContext context) {
            this._context = context;
        }

        public async Task<ICollection<Order>> GetOrders (int userId) {
            return await _context.Orders
                .Include (o => o.OrderProduct)
                .ThenInclude (op => op.Product)
                .ThenInclude (opr => opr.Restaurant)
                .Where (o => o.UserId == userId)
                .ToListAsync ();
        }

        public async Task<ICollection<Order>> GetOrdersAdmin (DateTime datumOd, DateTime datumDo) {
            return await _context.Orders
                .Include (o => o.User)
                .Include (o => o.OrderProduct)
                .ThenInclude (op => op.Product)
                .ThenInclude (opr => opr.Restaurant)
                .Where (o => o.OrderTime.Date >= datumOd.Date && o.OrderTime.Date <= datumDo.Date)
                .ToListAsync ();
        }

        public async Task<ICollection<Order>> GetOrdersOwner (DateTime datumOd, DateTime datumDo, int userId) {
            return await _context.Orders
                .Include (o => o.User)
                .Include (o => o.OrderProduct)
                .ThenInclude (op => op.Product)
                .ThenInclude (opr => opr.Restaurant)
                .Where (o => (o.OrderTime.Date >= datumOd.Date && o.OrderTime.Date <= datumDo.Date) && o.OrderProduct.Any (op => op.Product.Restaurant.UserId == userId))
                .ToListAsync ();
        }

        public async Task<int> postOrders (Order order) {
            _context.Orders.Add (order);

            await _context.SaveChangesAsync ();
            int orderId = order.OrderId;

            return orderId;
        }
        public async Task postOrderProducts (OrderProduct orderProduct) {
            _context.OrderProducts.Add (orderProduct);
            await _context.SaveChangesAsync ();
        }
    }
}