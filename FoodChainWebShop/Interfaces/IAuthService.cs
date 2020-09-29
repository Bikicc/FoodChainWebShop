using System.Threading.Tasks;
using FoodChainWebShop.Models;
using FoodChainWebShop.HelperClasses;
namespace FoodChainWebShop.Interfaces {
    public interface IAuthService {
        string generateJwtToken (User user);
        Task<User> getUser (User user);
        Task<User> getById (int id);
        Task<errorMessage> createUser (User user);
    }

}