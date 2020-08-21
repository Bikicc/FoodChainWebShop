using System.Collections.Generic;

namespace FoodChainWebShop.Models {
    public class Category {
        public int CategoryId { get; set; }
        public string Name_En { get; set; }
        public string Name_Hr { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}