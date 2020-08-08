using System.Threading.Tasks;

namespace FoodChainWebShop.EmailService {
    public interface IEmailSender {
        Task SendEmailAsync (Message message);
    }
}