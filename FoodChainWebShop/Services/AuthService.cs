using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FoodChainWebShop.authService {

    public class AuthService : IAuthService {
        private readonly AppSettings _appSettings;
        private readonly IAuthRepository _authRepository;
        public AuthService () { }

        public AuthService (IOptions<AppSettings> appSettings, DataContext context, IAuthRepository authRepository) {
            this._appSettings = appSettings.Value;
            this._authRepository = authRepository;
        }
        public string generateJwtToken (User user) {
            // Generiranje tokena koji je validan 7 dana
            var tokenHandler = new JwtSecurityTokenHandler ();
            var key = Encoding.ASCII.GetBytes (_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (new [] { 
                    new Claim("userId", user.UserId.ToString ()), 
                    new Claim("roleId", user.RoleId.ToString()), 
                    new Claim("address", user.Address), 
                    new Claim("mobileNumber", user.mobileNumber),
                    new Claim("email", user.Email) }),
                Expires = DateTime.UtcNow.AddDays (7),
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken (tokenDescriptor);
            return tokenHandler.WriteToken (token);
        }

        public async Task<User> getById (int id) {
            return await _authRepository.getById(id);
        }

        public async Task<User> getUser (User user) {
            return await _authRepository.getUser (user);
        }

        public async Task<errorMessage> createUser (User user) {
            return await _authRepository.createUser(user);
        }
    }
}