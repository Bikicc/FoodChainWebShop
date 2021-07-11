using System;
using FoodChainWebShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FoodChainWebShop.HelperClasses {

    [AttributeUsage (AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter {
        int roleId = 0;
        public AuthorizeAttribute(int roleId) {
            this.roleId = roleId;
        }
        public void OnAuthorization (AuthorizationFilterContext context) {
            var user = (User) context.HttpContext.Items["User"];
            
            if (user == null || this.roleId != user.RoleId) {
                // not logged in
                context.Result = new JsonResult (new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}