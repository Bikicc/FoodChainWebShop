using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodChainWebShop.Models {
    public class Product {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description_En { get; set; }
        public string Description_Hr { get; set; }
        public int Calories { get; set; }
        public int Proteins { get; set; }
        public int Carbs { get; set; }
        public int Sugar { get; set; }
        public int Fat { get; set; }
        public string ImageName { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<OrderProduct> OrderProduct { get; set; }
        public ICollection<Favourite> Favourites { get; set; }

    }
}