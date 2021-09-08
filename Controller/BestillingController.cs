using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SeasonLine.DAL;
using SeasonLine.Models;

namespace SeasonLine.Controller
{
    [Route("[controller]/[action]")]
    public class BestillingController : ControllerBase
    {
        private readonly IBestillingRepository _db;

        public BestillingController(IBestillingRepository db)
        {
            _db = db;
        }

        public async Task<List<Bestilling>> Bestillinger()
        {
            return await _db.AlleBestillinger();
        }

        public async Task<Boolean> NyBestilling(Bestilling nyBestilling)
        {
            return await _db.NyBestilling(nyBestilling);
        }
    }
}
