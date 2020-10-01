using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces {
    public interface IOrdersRepository {
        Task<ICollection<Order>> GetOrders (int userId);
        Task postOrders (Order order);
        Task postOrderProducts (OrderProduct orderProduct);
    }
}