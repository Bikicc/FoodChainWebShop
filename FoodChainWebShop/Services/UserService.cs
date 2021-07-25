using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Services {
    public class UserService : IUserService {
        private readonly IUserRepository _userRepo;

        public UserService (IUserRepository repo) {
            this._userRepo = repo;
        }

        public async Task<ICollection<User>> GetOwners () {
            return await _userRepo.getOwners ();
        }

        public async Task<errorMessage> UpdateUser (UserDataForUpdate user) {
            return await _userRepo.UpdateUser (user);
        }
    }
}