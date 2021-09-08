using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using SeasonLine.DAL;
using SeasonLine.Models;

namespace SeasonLine.Controllers
{
    [Route("[controller]/[action]")]
    public class ReiseController
    {
        private readonly ReiseContext _db;

        public ReiseController(ReiseContext db)
        {
            _db = db;
        }

        public List<Reise> HentReiser()
        {
            List<Reise> AlleReiser = _db.Reiser.Select(r => new Reise
            {
                ReiseID = r.ReiseID,
                PrisBarn = r.ReiseInformasjon.PrisBarn,
                PrisLugar = r.ReiseInformasjon.PrisLugar,
                PrisVoksne = r.ReiseInformasjon.PrisVoksne,
                ReiseFra = r.ReiseInformasjon.ReiseFra,
                ReiseTil = r.ReiseInformasjon.ReiseTil,
                AvreiseTid = r.AvreiseTid,

            }).ToList();



            return AlleReiser;

        }

    }
}
