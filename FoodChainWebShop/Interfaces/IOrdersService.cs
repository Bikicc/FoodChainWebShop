using FoodChainWebShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace FoodChainWebShop.Interfaces
{
    public interface IOrdersService
    {
         Task<ICollection<Order>> GetOrders (int userId);
         Task<int> postOrders (Order order);
         Task postOrderProducts (OrderProduct orderProduct);
         Task<ICollection<Order>> GetOrdersAdmin (DateTime datumOd, DateTime datumDo);
         Task<ICollection<Order>> GetOrdersOwner (DateTime datumOd, DateTime datumDo, int userId);
    }
}