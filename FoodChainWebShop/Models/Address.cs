namespace FoodChainWebShop.Models {
    public class Address {
        public int AddressId { get; set; }
        public string Name { get; set; }
        public User User { get; set; }

    }
}