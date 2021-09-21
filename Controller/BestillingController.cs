using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SeasonLine.DAL;
using SeasonLine.Models;

namespace SeasonLine.Controller
{
    [Route("[controller]/[action]")]
    public class BestillingController : ControllerBase
    {
        private readonly IBestillingRepository _db;
        private ILogger<BestillingController> _log;

        public BestillingController(IBestillingRepository db, ILogger<BestillingController> log)
        {
            _db = db;
            _log = log;
        }

        public async Task<List<Bestilling>> Bestillinger()
        {
            return await _db.AlleBestillinger();
        }

        public async Task<ActionResult> NyBestilling(Bestilling nyBestilling)
        {
            if (ModelState.IsValid)
            {
                bool lagreOK = await _db.NyBestilling(nyBestilling);
                if (!lagreOK)
                {
                    _log.LogInformation("Bestillingen kunne ikke lagres");
                    return BadRequest("Bestillingen kunne ikke lagres");
                }
                return Ok("Bestillingen er lagret");
            }

            return BadRequest("Feil i inputvalidering");
        }
    }
}
