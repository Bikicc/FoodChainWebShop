using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FoodChainWebShop.HelperClasses {
    public class JwtMiddleware {
        private readonly RequestDelegate _next;
        private readonly AppSettings _appSettings;

        public JwtMiddleware (RequestDelegate next, IOptions<AppSettings> appSettings) {
            _next = next;
            _appSettings = appSettings.Value;
        }

        public async Task Invoke (HttpContext context, IAuthService userService) {
            var token = context.Request.Headers["Authorization"].FirstOrDefault ()?.Split (" ").Last ();

            if (token != null)
                attachUserToContext (context, userService, token);

            await _next (context);
        }

        private async void attachUserToContext (HttpContext context, IAuthService userService, string token) {
            try {
                var tokenHandler = new JwtSecurityTokenHandler ();
                var key = Encoding.ASCII.GetBytes (_appSettings.Secret);
                tokenHandler.ValidateToken (token, new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey (key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken) validatedToken;
                var userId = int.Parse (jwtToken.Claims.First (x => x.Type == "id").Value);

                context.Items["User"] = await userService.getById (userId);
            } catch(Exception e) {
                Console.WriteLine($"Exception: {e}");
            } 
        }
    }
}