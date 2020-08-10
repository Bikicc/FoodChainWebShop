using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FoodChainWebShop.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class ValuesController : ControllerBase {
        private readonly DataContext _context;
        public ValuesController (DataContext context) {
            this._context = context;

        }

        // [HttpGet]
        // public async Task<IActionResult> GetValues () {
        //     // var values = await _context.Values.ToListAsync();

        //     // return Ok (values);
        // }

        // [HttpGet ("{id}")] //na ovaj nacin definiramo dodatni parametar
        // public async Task<IActionResult> GetValue (int id) {
        //     // var value = _context.Values.FirstOrDefault(x => x.Id == id);
        //     // var value = await _context.Values.FindAsync(id);
        //     // return Ok(value);

        // }
    }
}