using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Services {
    public class OrdersService : IOrdersService {
        private readonly IOrdersRepository _ordersRepo;

        public OrdersService (IOrdersRepository repo) {
            this._ordersRepo = repo;
        }

        public async Task<ICollection<Order>> GetOrders (int userId) {
            return await _ordersRepo.GetOrders (userId);
        }

        public async Task<int> postOrders (Order order) {
            return await _ordersRepo.postOrders (order);
        }
        public async Task postOrderProducts (OrderProduct orderProduct) {
            await _ordersRepo.postOrderProducts (orderProduct);
        }

        public async Task<ICollection<Order>> GetOrdersAdmin (DateTime datumOd, DateTime datumDo) {
            return await _ordersRepo.GetOrdersAdmin (datumOd, datumDo);
        }

        public async Task<ICollection<Order>> GetOrdersOwner (DateTime datumOd, DateTime datumDo, int userId) {
            return await _ordersRepo.GetOrdersOwner (datumOd, datumDo, userId);

        }
    }
}