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

        public async Task<ActionResult> Lagre(Billett b)
        {
            // Validering
            if (ModelState.IsValid)
            {
                int billettId = await _db.Lagre(b);
                if (billettId == -1)
                {
                    _log.LogInformation("Bestilling mislykket");
                    return BadRequest("Bestilling mislykket");
                }

                return Ok(billettId);
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering");
        }

        public async Task<ActionResult> Billett(int id)
        {
            Billett billett = await _db.Billett(id);
            if (billett == null)
            {
                _log.LogInformation("Billett ikke funnet");
                return BadRequest("Billett ikke funnet");
            }

            return Ok(billett);
        }
    }
}
