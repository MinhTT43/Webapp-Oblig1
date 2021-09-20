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
            return await _db.Reiser();
        }

        public async Task<List<Reise>> Ruter()
        {
            return await _db.Ruter();
        }

        public async Task<Rute> EnRute(int id)
        {
            return await _db.EnRute(id);
        }

        public async Task<List<Reise>> AvreiseDato(int id)
        {
            return await _db.AvreiseDato(id);
        }

    }
}
