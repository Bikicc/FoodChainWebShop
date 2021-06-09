using Newtonsoft.Json;

namespace FoodChainWebShop.Models {
    public class Favourite {
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }

    }
}