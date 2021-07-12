using System;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FoodChainWebShop.HelperClasses {

    [AttributeUsage (AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter {
        int roleId = 0;
        enum rolesId {
            admin = 1,
            vlasnik = 2,
            korisnik = 3
        }
        public AuthorizeAttribute (string roleName) {
            if (roleName.ToUpper () == "admin".ToUpper ()) {
                this.roleId = (int) rolesId.admin;
            } else if (roleName.ToUpper () == "vlasnik".ToUpper ()) {
                this.roleId = (int) rolesId.vlasnik;
            } else if (roleName.ToUpper () == "korisnik".ToUpper ()) {
                this.roleId = (int) rolesId.korisnik;
            }
        }
        public void OnAuthorization (AuthorizationFilterContext context) {
            var user = (User) context.HttpContext.Items["User"];

            if (user == null || this.roleId != user.RoleId) {
                context.Result = new JsonResult (new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}