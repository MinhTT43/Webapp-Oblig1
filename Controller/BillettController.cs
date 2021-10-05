using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Castle.Core.Logging;
using DeezSalings.DAL;
using DeezSalings.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DeezSalings.Controller
{
    [Route("[controller]/[action]")]
    public class BillettController : ControllerBase
    {
        private readonly IBillettRepository _db;
        private readonly ILogger<BillettController> _log;

        public BillettController(IBillettRepository db, ILogger<BillettController> log)
        {
            _db = db;
            _log = log;
        }

        public async Task<ActionResult> Billetter()
        {
            List<Billett> alleBilletter = await _db.Billetter();

            return Ok(alleBilletter);
        }

        public async Task<ActionResult> Lagre(Billett b)
        {
            Console.Write(ModelState.IsValid);
            if (ModelState.IsValid)
            {
                bool returOk = await _db.Lagre(b);
                if (!returOk)
                {
                    _log.LogInformation("Bestilling mislykket");
                    return BadRequest("Bestilling mislykket");
                }

                return Ok("Bestilling velykket");
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering");
        }

        public async Task<Avreise> avreisetest(Billett b)
        {
            return await _db.avreisetest(b);
        }

    }
}
