using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SeasonLine.Models;

namespace SeasonLine.DAL
{
    public class ReiseRepository : IReiseRepository
    {
        private readonly ReiseContext _db;

        public ReiseRepository(ReiseContext db)
        {
            _db = db;
        }

        public async Task<List<Reise>> AlleReiser()
        {
            try
            {
                List<Reise> AlleReiser = await _db.Reiser.Select(r => new Reise
                {
                    ReiseID = r.ReiseID,
                    PrisBarn = r.ReiseInformasjon.PrisBarn,
                    PrisLugar = r.ReiseInformasjon.PrisLugar,
                    PrisVoksne = r.ReiseInformasjon.PrisVoksne,
                    ReiseFra = r.ReiseInformasjon.ReiseFra,
                    ReiseTil = r.ReiseInformasjon.ReiseTil,
                    AvreiseTid = r.AvreiseTid,

                }).ToListAsync();



                return AlleReiser;
            }
            catch
            {
                return null;
            }

        }

    }
}

