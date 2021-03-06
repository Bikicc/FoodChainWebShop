using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace FoodChainWebShop.Models {
    public class Restaurant {
        public int RestaurantId { get; set; }

        [Required]
        public string Name { get; set; }

        public byte[] Image { get; set; }
        public IFormFile ImageFile { get; set; }

        [Required]
        [Phone (ErrorMessage = "Entered number is invalid!")]
        public string mobileNumber { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public bool Active { get; set; }

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

        [JsonIgnore]
        public RestaurantType RestaurantType { get; set; }

        [JsonIgnore]
        public ICollection<RestaurantReview> RestaurantReviews { get; set; }

    }
}