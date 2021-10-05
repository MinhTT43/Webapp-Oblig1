using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeezSalings.Model;
using Microsoft.EntityFrameworkCore;

namespace DeezSalings.DAL
{
    public class ReiseRepository : IReiseRepository
    {
        // Opprett objekt _db av rypen ReiseContext
        private readonly DB _db;

        public ReiseRepository(DB db)
        {
            // Tildel verdi til _db
            _db = db;
        }

        // Hent ALLE reiseruterb
        public async Task<List<Reise>> Reiser()
        {
            try
            {
                List<Reiserute> alleRuter = await _db.Reiseruter.ToListAsync();
                List<Reise> alleReiser = new List<Reise>();

                foreach (var rute in alleRuter)
                {
                    Reise nyReise = new Reise
                    {
                        id = rute.ruteNr,
                        avreisested = rute.avreisested,
                        destinasjon = rute.destinasjon,
                        prisBarn = rute.prisBarn,
                        prisVoken = rute.prisVoksen,
                        standardLugar = rute.standardLugar,
                        premiumLugar = rute.premiumLugar,

                    };

                    alleReiser.Add(nyReise);
                }

                return alleReiser;
            }
            catch
            {
                return null;
            }
        }

        // Hent avreistid knyttet til en reise
        public async Task<List<Reise>> Avreisetid(int id)
        {
            try
            {
                List<Avreise> alleAvreiser = await _db.Avreiser.ToListAsync();
                List<Reise> utvalgteAvreiser = new List<Reise>();
                foreach (var avreise in alleAvreiser)
                {
                    if (avreise.rute.ruteNr == id)
                    {
                        Reise nyReise = new Reise
                        {
                            avreisested = avreise.rute.avreisested,
                            destinasjon = avreise.rute.destinasjon,
                            avreisetid = avreise.avreisetid
                        };

                        utvalgteAvreiser.Add(nyReise);
                    }
                }
                return utvalgteAvreiser;
            }
            catch
            {
                return null;
            }
        }

        // Hent avreisetid utifra valgt dato
        public async Task<List<Avreise>> valgtAvreisetid(int id, int day, int month, int year)
        {
            DateTime tid = new DateTime(year, month, day, 00, 00, 00);
            Avreise forsteAvreise = await _db.Avreiser.FirstOrDefaultAsync(a => a.avreisetid.Month == tid.Month && a.avreisetid.Date == tid.Date && a.avreisetid.Year == tid.Year && a.rute.ruteNr == id);
            List<Avreise> funnetAvreiser = new List<Avreise>();



            for (int i = 2; i > 0; i--)
            {
                var nyTid = tid.AddDays(-i);
                funnetAvreiser.Add(await _db.Avreiser.FirstOrDefaultAsync(a => a.avreisetid.Month == nyTid.Month && a.avreisetid.Date == nyTid.Date && a.avreisetid.Year == nyTid.Year && a.rute.ruteNr == id));
            }

            funnetAvreiser.Add(forsteAvreise);


            for (int i = 1; i < 4; i++)
            {
                var nyTid = tid.AddDays(+i);
                if (nyTid.Day == 31)
                {
                    nyTid.AddDays(-30);
                    nyTid.AddMonths(+1);
                    funnetAvreiser.Add(await _db.Avreiser.FirstOrDefaultAsync(a => a.avreisetid.Month == nyTid.Month && a.avreisetid.Date == nyTid.Date && a.avreisetid.Year == nyTid.Year && a.rute.ruteNr == id));
                }
                else
                {
                    funnetAvreiser.Add(await _db.Avreiser.FirstOrDefaultAsync(a => a.avreisetid.Month == nyTid.Month && a.avreisetid.Date == nyTid.Date && a.avreisetid.Year == nyTid.Year && a.rute.ruteNr == id));
                }
            }

            return funnetAvreiser;

        }


        // Hent informasjon knytte til reiserute
        public async Task<Reiserute> Reiserute(int id)
        {
            return await _db.Reiseruter.FirstOrDefaultAsync(r => r.ruteNr == id);
        }
    }

}
