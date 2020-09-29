using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Repositories {
    public class AuthRepository : IAuthRepository {
        private readonly DataContext _context;

        public AuthRepository (DataContext context) {
            this._context = context;
        }
        public async Task<User> getUser (User user) {
            return await (from u in this._context.Users where u.Username == user.Username && u.Password == user.Password select u) //(new { UserId = u.UserId, Email = u.Email, Username = u.Username })
                .FirstOrDefaultAsync ();
        }

        public async Task<User> getById (int id) {
            return await _context.Users.SingleOrDefaultAsync (us => us.UserId == id);
        }

        public async Task<errorMessage> createUser (User user) {
            if (await _context.Users.Where (x => x.Username == user.Username).AnyAsync ()) {
                errorMessage error = new errorMessage (1, "Username already taken!");
                return error;
            }

            if (await _context.Users.Where (x => x.Email == user.Email).AnyAsync ()) {
                errorMessage error = new errorMessage (2, "Email already taken!");
                return error;
            }

            _context.Users.Add (user);
            await _context.SaveChangesAsync ();
            return null;
        }
    }
}