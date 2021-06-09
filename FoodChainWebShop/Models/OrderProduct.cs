using System.ComponentModel.DataAnnotations;

namespace FoodChainWebShop.Models {
    public class OrderProduct {
        [Required]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Required]
        public int Quantity { get; set; }
       
        [Required]
        public double ProductPriceATM { get; set; }

    }
}