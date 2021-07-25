using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Repositories {
    public class UserRepository : IUserRepository {
        private readonly DataContext _context;
        private enum rolesId {
            admin = 1,
            vlasnik = 2,
            korisnik = 3
        }
        public UserRepository (DataContext context) {
            this._context = context;
        }

        public async Task<ICollection<User>> getOwners () {
            return await _context.Users
                .Where (u => u.RoleId == (int) rolesId.vlasnik)
                .ToListAsync ();
        }

        public async Task<errorMessage> UpdateUser (UserDataForUpdate user) {
            if (await _context.Users.Where (x => x.Email == user.Email && x.UserId != user.UserId).AnyAsync ()) {
                errorMessage error = new errorMessage (2, "Email already taken!");
                return error;
            }

            var userToUpdate = _context.Users.SingleOrDefault(u => u.UserId == user.UserId);
            
            userToUpdate.Address = user.Address;
            userToUpdate.mobileNumber = user.mobileNumber;
            userToUpdate.Email = user.Email;

            await _context.SaveChangesAsync ();
            return null;
        }
    }
}