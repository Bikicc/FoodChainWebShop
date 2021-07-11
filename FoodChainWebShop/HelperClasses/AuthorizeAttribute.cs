using System;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FoodChainWebShop.HelperClasses {

    [AttributeUsage (AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter {
        int roleId = 0;
        private readonly RolesConfiguration _rolesConfig;

        public AuthorizeAttribute (RolesConfiguration rolesConfig) {
            this._rolesConfig = rolesConfig;
        }
        public AuthorizeAttribute (string roleName) {
            if (roleName.ToUpper () == "admin".ToUpper ()) {
                this.roleId = this._rolesConfig.Admin;
            } else if (roleName.ToUpper () == "vlasnik".ToUpper ()) {
                this.roleId = this._rolesConfig.Vlasnik;
            } else if (roleName.ToUpper () == "korisnik".ToUpper ()) {
                this.roleId = this._rolesConfig.Korisnik;
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