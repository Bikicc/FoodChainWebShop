using System.Collections.Generic;

namespace FoodChainWebShop.Models {
    public class Discount {
        public int DiscountId { get; set; }
        public int Percentage { get; set; }
        public double price { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}