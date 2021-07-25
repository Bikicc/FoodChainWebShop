using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Interfaces {
    public interface IUserService {
        Task<ICollection<User>> GetOwners ();
        Task<errorMessage> UpdateUser (UserDataForUpdate user);
    }
}