using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FoodChainWebShop.EmailService;

namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class WeatherForecastController : ControllerBase {
        private readonly IEmailSender _emailSender;
        private static readonly string[] Summaries = new [] {
            "Freezing",
            "Bracing",
            "Chilly",
            "Cool",
            "Mild",
            "Warm",
            "Balmy",
            "Hot",
            "Sweltering",
            "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController (ILogger<WeatherForecastController> logger, IEmailSender emailSender) {
            _logger = logger;
            _emailSender = emailSender;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get () {
            var rng = new Random ();
            return Enumerable.Range (1, 5).Select (index => new WeatherForecast {
                    Date = DateTime.Now.AddDays (index),
                        TemperatureC = rng.Next (-20, 55),
                        Summary = Summaries[rng.Next (Summaries.Length)]
                })
                .ToArray ();
        }

        [HttpGet ("{id}")] //na ovaj nacin definiramo dodatni parametar
        public int Get (int id) {
            return id;
        }

        [HttpPost]
        public async Task Post () {
            var _message = new Message (Request.Form["from"], Request.Form["subject"], Request.Form["content"]);
            await _emailSender.SendEmailAsync (_message);
        }

        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

        [HttpDelete ("{id}")]
        public void Delete (int id) { }
    }
}