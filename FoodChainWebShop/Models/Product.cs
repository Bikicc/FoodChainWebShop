using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace FoodChainWebShop.Models {
    public class Product {
        public int ProductId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public double Price { get; set; }
        public string Description_En { get; set; }
        public string Description_Hr { get; set; }
        public int? Calories { get; set; }
        public int? Proteins { get; set; }
        public int? Carbs { get; set; }
        public int? Sugar { get; set; }
        public int? Fat { get; set; }
        public IFormFile ImageFile { get; set; }
        public byte[] Image { get; set; }

        [Required]
        public bool Deleted { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Required]
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
        public ICollection<OrderProduct> OrderProduct { get; set; }
        public ICollection<Favourite> Favourites { get; set; }
    }

}