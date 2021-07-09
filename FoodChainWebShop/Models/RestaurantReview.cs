using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace FoodChainWebShop.Models {
    public class RestaurantReview {
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }

        [Required]
        public int rating { get; set; }
        public string comment { get; set; }

    }
}