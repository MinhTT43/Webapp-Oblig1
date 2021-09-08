using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using SeasonLine.DAL;
using SeasonLine.Models;
using System.Threading.Tasks;

namespace SeasonLine.Controllers
{
    [Route("[controller]/[action]")]
    public class ReiseController : ControllerBase
    {
        private readonly IReiseRepository _db;

        public ReiseController(IReiseRepository db)
        {
            _db = db;
        }

        public async Task<List<Reise>> Reiser()
        {
            return await _db.AlleReiser();
        }

    }
}
