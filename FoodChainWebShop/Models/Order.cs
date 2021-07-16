using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace FoodChainWebShop.Models {
    public class Order {
        public int OrderId { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public DateTime OrderTime { get; set; }
        public string Note { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<OrderProduct> OrderProduct { get; set; }

    }
}