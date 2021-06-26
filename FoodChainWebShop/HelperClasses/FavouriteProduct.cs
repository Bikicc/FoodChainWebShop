using FoodChainWebShop.Models;

namespace FoodChainWebShop.HelperClasses
{
    public class FavouriteProduct
    {
        public int productId { get; set; }
        public string name { get; set; }
        public double price { get; set; }
        public byte[] image { get; set; }
        public Restaurant restaurant { get; set; }
        public FavouriteProduct (Product product) {
            productId = product.ProductId;
            name = product.Name;
            price = product.Price;
            image = product.Image;
        }

        public FavouriteProduct(){}
    }
}