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

        private readonly DB _db;

        // Konstruktør
        public ReiseRepository(DB db)
        {
            _db = db;
        }

        // Metode for å hente alle reiseruter
        public async Task<List<Reise>> Reiseruter()
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

        // Metode for å hente informasjon for en reiserute
        public async Task<Reiserute> Reiserute(int id)
        {
            try
            {
                Avreise enAvreise = await _db.Avreiser.FirstOrDefaultAsync(
                    a => a.avreiseId == id);
                return enAvreise.rute;
            }
            catch
            {
                return null;
            }
        }

        // Hent avreisetid basert på dato
        public async Task<List<Avreise>>
            Avreisetider(int id, int day, int month, int year)
        {
            try
            {
                DateTime tid = new DateTime(year, month, day, 00, 00, 00);

                Avreise forsteAvreise = await _db.Avreiser.FirstOrDefaultAsync(a =>
                a.avreisetid.Month == tid.Month
                && a.avreisetid.Date == tid.Date
                && a.avreisetid.Year == tid.Year
                && a.rute.ruteNr == id);

                List<Avreise> funnetAvreiser = new List<Avreise>();

                funnetAvreiser.Add(forsteAvreise);

                // Hent de 4 neste reisene fra datoen som kommer inn
                for (int i = 1; i < 4; i++)
                {
                    var nyTid = tid.AddDays(+i);
                    if (nyTid.Day == 31)
                    {
                        nyTid.AddDays(-30);
                        nyTid.AddMonths(+1);

                        funnetAvreiser.Add(await _db.Avreiser.FirstOrDefaultAsync
                            (a => a.avreisetid.Month == nyTid.Month
                            && a.avreisetid.Date == nyTid.Date
                            && a.avreisetid.Year == nyTid.Year
                            && a.rute.ruteNr == id));
                    }
                    else
                    {
                        funnetAvreiser.Add(await _db.Avreiser.FirstOrDefaultAsync
                            (a => a.avreisetid.Month == nyTid.Month
                            && a.avreisetid.Date == nyTid.Date
                            && a.avreisetid.Year == nyTid.Year
                            && a.rute.ruteNr == id));
                    }
                }

                return funnetAvreiser;
            }
            catch
            {
                return null;
            }
        }

        // Metode for å hent en avreise
        public async Task<Avreise> Avreise(int id)
        {
            try
            {
                return await _db.Avreiser.FirstOrDefaultAsync(
                    a => a.avreiseId == id);
            }
            catch
            {
                return null;
            }
        }
    }

}
