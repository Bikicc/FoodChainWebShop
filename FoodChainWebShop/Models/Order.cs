using System;
using System.Collections.Generic;

namespace FoodChainWebShop.Models {
    public class Order {
        public int OrderId { get; set; }
        public double Price { get; set; }
        public DateTime OrderTime { get; set; }
        public string Note { get; set; }
        public string Address { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<OrderProduct> OrderProduct { get; set; }

    }
}