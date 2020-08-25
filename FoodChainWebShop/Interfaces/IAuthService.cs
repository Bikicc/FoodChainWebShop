using FoodChainWebShop.Models;

namespace FoodChainWebShop.authService
{
    public interface IAuthService
    {
        string generateJwtToken(User user);
        User GetById(int id);
    } 

}