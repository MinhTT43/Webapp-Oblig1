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

        // Hent ALLE reiseruter
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
    }

}
