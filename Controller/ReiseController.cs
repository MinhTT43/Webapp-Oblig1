using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Castle.Core.Internal;
using DeezSalings.DAL;
using DeezSalings.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DeezSalings.Controller
{
    [Route("[controller]/[action]")]
    public class ReiseController : ControllerBase
    {
        private readonly IReiseRepository _db;

        private ILogger<ReiseController> _log;

        public ReiseController(IReiseRepository db, ILogger<ReiseController> log)
        {
            _db = db;
            _log = log;
        }

        public async Task<ActionResult> Reiser()
        {
            List<Reise> alleReiser = await _db.Reiser();

            return Ok(alleReiser);

        }

        public async Task<ActionResult> Avreisetid(int id)
        {
            List<Reise> alleAvreisetider = await _db.Avreisetid(id);
            if (alleAvreisetider.IsNullOrEmpty())
            {
                _log.LogInformation("Fant ingen avgangstider med ruteNr : " + id);
                return NotFound("Fant ingen avgangstider med ruteNr : " + id);
            }
            return Ok(alleAvreisetider);
        }

    }
}
