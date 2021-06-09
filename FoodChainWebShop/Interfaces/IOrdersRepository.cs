using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;
using System.Linq;
namespace FoodChainWebShop.Interfaces {
    public interface IOrdersRepository {
        Task<ICollection<Order>> GetOrders (int userId);
        Task<int> postOrders (Order order);
        Task postOrderProducts (OrderProduct orderProduct);
    }
}