namespace FoodChainWebShop.HelperClasses
{
    public class errorMessage
    {
        public int errorId { get; set; }
        public string message { get; set; }

        public errorMessage(int id, string message) {
            this.errorId = id;
            this.message = message;
        }
    }
}