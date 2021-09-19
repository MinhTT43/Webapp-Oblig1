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
                List<Avreise> AlleAvreiser = await _db.Avreiser.ToListAsync();
                List<Reise> AlleReiser = new List<Reise>();

                foreach (var avreiser in AlleAvreiser)
                {
                    foreach (var rute in avreiser.Ruter)
                    {
                        Reise nyReise = new Reise
                        {
                            ReiseID = rute.ReiseID,
                            PrisBarn = rute.PrisBarn,
                            PrisLugar = rute.PrisLugar,
                            PrisVoksne = rute.PrisVoksne,
                            ReiseFra = rute.ReiseFra,
                            ReiseTil = rute.ReiseTil,
                            AvreiseTid = avreiser.AvreiseTid,
                        };
                        AlleReiser.Add(nyReise);
                    }
                }
                return AlleReiser;

            }
            catch
            {
                return null;
            }

        }

        public async Task<List<Reise>> AlleRuter()
        {
            try
            {
                List<Rute> AlleRuter = await _db.Rute.ToListAsync();
                List<Reise> AlleReiser = new List<Reise>();

                foreach (var rute in AlleRuter)
                {
                    Reise nyReise = new Reise
                    {
                        ReiseID = rute.ReiseID,
                        PrisBarn = rute.PrisBarn,
                        PrisLugar = rute.PrisLugar,
                        PrisVoksne = rute.PrisVoksne,
                        ReiseFra = rute.ReiseFra,
                        ReiseTil = rute.ReiseTil,
                    };
                    AlleReiser.Add(nyReise);

                }
                return AlleReiser;

            }
            catch
            {
                return null;
            }
        }

    }
}

