using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Interfaces {
    public interface IUserRepository {
        Task<ICollection<User>> getOwners ();
        Task<errorMessage> UpdateUser (UserDataForUpdate user);
    }
}