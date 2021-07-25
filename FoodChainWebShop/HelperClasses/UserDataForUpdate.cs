using System.ComponentModel.DataAnnotations;

namespace FoodChainWebShop.HelperClasses {
    public class UserDataForUpdate {
        public int UserId { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Phone (ErrorMessage = "Entered number is invalid!")]
        public string mobileNumber { get; set; }

        public string Address { get; set; }
    }
}