using System.Threading.Tasks;
using FoodChainWebShop.EmailService;
namespace FoodChainWebShop.Interfaces {
    public interface IEmailSender {
        Task SendEmailAsync (Message message);
    }
}