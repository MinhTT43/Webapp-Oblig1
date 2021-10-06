using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Castle.Core.Internal;
using DeezSalings.DAL;
using DeezSalings.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SQLitePCL;

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

        public async Task<ActionResult> Reiseruter()
        {
            List<Reise> reiseruter = await _db.Reiseruter();
            if (reiseruter == null)
            {
                _log.LogInformation("Ingen reiser funnet");
                return BadRequest("Ingen reiser funnet");
            }
            else
            {
                return Ok(reiseruter);
            }

        }

        public async Task<ActionResult> Reiserute(int id)
        {
            Reiserute reiserute = await _db.Reiserute(id);
            if (reiserute == null)
            {
                _log.LogInformation("Reisen ble ikke funnet");
                return BadRequest("Reise ikke funnet");
            }
            else
            {
                return Ok(reiserute);
            }
        }

        public async Task<ActionResult> Avreisetider(int id, int day, int month, int year)
        {

            List<Avreise> avreiser = await _db.Avreisetider(id, day, month, year);
            if (avreiser == null || (avreiser[0] == null &&
                avreiser[0] == null && avreiser[0] == null))
            {
                _log.LogInformation("Ingen avreiser funnet");
                return BadRequest("Ingen avreiser funnet");
            }
            else
            {
                return Ok(avreiser);
            }

        }

        public async Task<ActionResult> Avreise(int id)
        {
            Avreise avreise = await _db.Avreise(id);
            if (avreise == null)
            {
                _log.LogInformation("Ingen avreiser funnet");
                return BadRequest("Ingen avreiser funnet");
            }
            else
            {
                return Ok(avreise);
            }
        }

    }
}
