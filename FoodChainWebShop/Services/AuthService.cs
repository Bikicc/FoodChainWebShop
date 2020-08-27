using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using FoodChainWebShop.Data;

namespace FoodChainWebShop.authService {

    public class AuthService : IAuthService {
        private readonly AppSettings _appSettings;
        private readonly DataContext _context;

        public AuthService () { }

        public AuthService (IOptions<AppSettings> appSettings, DataContext context) {
            this._appSettings = appSettings.Value;
            this._context = context;
        }
        public string generateJwtToken (User user) {
            // Generiranje tokena koji je validan 7 dana
            var tokenHandler = new JwtSecurityTokenHandler ();
            var key = Encoding.ASCII.GetBytes (_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (new [] { new Claim ("id", user.UserId.ToString ()) }),
                Expires = DateTime.UtcNow.AddDays (7),
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken (tokenDescriptor);
            return tokenHandler.WriteToken (token);
        }

        public User GetById (int id) {
            return _context.Users.FirstOrDefault (x => x.UserId == id);
        }
    }
}