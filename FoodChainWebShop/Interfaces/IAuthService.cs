using System.Threading.Tasks;
using FoodChainWebShop.Models;
using FoodChainWebShop.HelperClasses;
namespace FoodChainWebShop.authService {
    public interface IAuthService {
        string generateJwtToken (User user);
        Task<User> getUser (User user);
        Task<User> getById (int id);
        Task<errorMessage> createUser (User user);
    }

}