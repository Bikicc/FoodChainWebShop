using FoodChainWebShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodChainWebShop.Interfaces
{
    public interface IOrdersService
    {
         Task<ICollection<Order>> GetOrders (int userId);
         Task postOrders (Order order);
         Task postOrderProducts (OrderProduct orderProduct);
    }
}