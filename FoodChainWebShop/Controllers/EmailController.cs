
using System.Threading.Tasks;
using FoodChainWebShop.EmailService;
using Microsoft.AspNetCore.Mvc;
using FoodChainWebShop.Interfaces;
namespace FoodChainWebShop.Controllers {

    [ApiController]
    [Route ("api/[controller]")]
    public class EmailController : ControllerBase {
        private readonly IEmailSender _emailSender;

        public EmailController (IEmailSender emailSender) {
            _emailSender = emailSender;
        }

        [HttpPost]
        public async Task Post () {
            var _message = new Message (Request.Form["from"], Request.Form["subject"], Request.Form["content"]);
            await _emailSender.SendEmailAsync (_message);
        }
    }
}