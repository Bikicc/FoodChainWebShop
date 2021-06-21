using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace FoodChainWebShop.Models {
    public class RestaurantType {
        public int RestaurantTypeId { get; set; }
        public string Name_En { get; set; }
        public string Name_Hr { get; set; }

        [JsonIgnore]
        public ICollection<Restaurant> Restaurants { get; set; }
    }
}