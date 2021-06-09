using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace FoodChainWebShop.Models {
    public class Restaurant {
        public int RestaurantId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string imageName { get; set; }

        [Required]
        [Phone (ErrorMessage = "Entered number is invalid!")]
        public string mobileNumber { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public int minOrderPrice { get; set; }

        [Required]
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [JsonIgnore]
        public ICollection<Product> Products { get; set; }

        [Required]
        public int RestaurantTypeId { get; set; }
        public RestaurantType RestaurantType { get; set; }

    }
}