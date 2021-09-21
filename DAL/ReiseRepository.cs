using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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

        public async Task<List<Reise>> Reiser()
        {
            try
            {
                List<Avreise> AlleAvreiser = await _db.Avreiser.ToListAsync();
                List<Reise> AlleReiser = new List<Reise>();

                foreach (var avreiser in AlleAvreiser)
                {
                    foreach (var rute in avreiser.Ruter)
                    {
                        if (rute.Id == 2)
                        {
                            Reise nyReise = new Reise
                            {
                                ReiseID = rute.Id,
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
                }
                return AlleReiser;

            }
            catch
            {
                return null;
            }

        }


        public async Task<List<Reise>> AvreiseDato(int id)
        {
            try
            {
                List<Avreise> AlleAvreiser = await _db.Avreiser.ToListAsync();
                List<Reise> Avreiser = new List<Reise>();

                foreach (var avreiser in AlleAvreiser)
                {
                    foreach (var rute in avreiser.Ruter)
                    {
                        if (rute.Id == id)
                        {
                            Reise nyReise = new Reise
                            {
                                ReiseID = rute.Id,
                                AvreiseTid = avreiser.AvreiseTid,
                            };
                            Avreiser.Add(nyReise);
                        }
                    }
                }
                return Avreiser;

            }
            catch
            {
                return null;
            }

        }

        public async Task<List<Reise>> Ruter()
        {
            try
            {
                List<Rute> AlleRuter = await _db.Rute.ToListAsync();
                List<Reise> AlleReiser = new List<Reise>();

                foreach (var rute in AlleRuter)
                {
                    Reise nyReise = new Reise
                    {
                        ReiseID = rute.Id,
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


        public async Task<Rute> EnRute(int id)
        {
            try
            {
                Rute enRute = await _db.Rute.FindAsync(keyValues: id);
                var hentetRute = new Rute()
                {
                    Id = enRute.Id,
                    ReiseFra = enRute.ReiseFra,
                    ReiseTil = enRute.ReiseTil,
                    PrisBarn = enRute.PrisBarn,
                    PrisLugar = enRute.PrisLugar,
                    PrisVoksne = enRute.PrisVoksne

                };

                return hentetRute;
            }
            catch
            {
                return null;
            };

        }
    }
}

