using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodChainWebShop.Services
{
    public class OrdersService : IOrdersService
    {
        private readonly IOrdersRepository _ordersRepo;

        public OrdersService(IOrdersRepository repo) {
            this._ordersRepo = repo;
        }

        public async Task<ICollection<Order>> GetOrders (int userId) {
            return await _ordersRepo.GetOrders(userId);
        }

        public async Task postOrders (Order order) {
            await _ordersRepo.postOrders(order);
        }

        public async Task postOrderProducts (OrderProduct orderProduct) {
            await _ordersRepo.postOrderProducts(orderProduct);
        }
    }
}