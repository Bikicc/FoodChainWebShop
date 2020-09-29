using FoodChainWebShop.Models;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> getUser(User user);
        Task<User> getById(int id);
        Task<errorMessage> createUser (User user);
    }
}