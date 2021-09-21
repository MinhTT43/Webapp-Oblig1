using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeasonLine.Models;

namespace SeasonLine.DAL
{
    public class BestillingRepository : IBestillingRepository
    {
        private readonly BestillingContext _db;


        public BestillingRepository(BestillingContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<List<Bestilling>> AlleBestillinger()
        {
            try
            {
                List<Kunde> alleKunder = await _db.Kunder.ToListAsync();
                List<Bestilling> alleBestillinger = new List<Bestilling>();


                foreach (var kunde in alleKunder)
                {
                    foreach (var info in kunde.Info)
                    {
                        var enBestilling = new Bestilling
                        {
                            Fornavn = kunde.Fornavn,
                            Etternavn = kunde.Etternavn,
                            Telefon = kunde.Telefon,
                            Epost = kunde.Epost,
                            AntallBarn = info.AntallBarn,
                            AntallVoksne = info.AntallVoksne,
                            AntallLugarer = info.AntallLugarer,
                            DatoBestilt = info.DatoBestilt,
                            ReiseFra = info.ReiseFra,
                            ReiseTil = info.ReiseTil,
                            AvreiseDato = info.AvreiseDato,

                        };
                        alleBestillinger.Add(enBestilling);
                    }
                }
                return alleBestillinger;
            }
            catch
            {
                return null;
            }
        }

        [HttpPost]
        public async Task<bool> NyBestilling(Bestilling nyBestilling)
        {
            try
            {

                {
                    // Fyll ut informasjon knyttet til bestillingen
                    var bestillinfo = new BestillingInformasjon
                    {
                        AntallBarn = nyBestilling.AntallBarn,
                        AntallLugarer = nyBestilling.AntallLugarer,
                        AntallVoksne = nyBestilling.AntallVoksne,
                        DatoBestilt = nyBestilling.DatoBestilt,
                        ReiseFra = nyBestilling.ReiseFra,
                        ReiseTil = nyBestilling.ReiseTil,
                        AvreiseDato = nyBestilling.AvreiseDato,
                    };

                    // Sjekk om kunden eksisterer
                    Kunde kundeExist = await _db.Kunder.FirstOrDefaultAsync(k => k.Epost == nyBestilling.Epost);

                    if (kundeExist == null) // Kunde ikke funnet
                    {
                        // Opprett kunde
                        var nyKunde = new Kunde
                        {
                            Fornavn = nyBestilling.Fornavn,
                            Etternavn = nyBestilling.Etternavn,
                            Telefon = nyBestilling.Telefon,
                            Epost = nyBestilling.Epost,
                        };

                        // Legg inn bestillings informasjon
                        nyKunde.Info = new List<BestillingInformasjon>();
                        nyKunde.Info.Add(bestillinfo);
                        _db.Kunder.Add(nyKunde);
                        await _db.SaveChangesAsync();
                    }
                    else
                    {
                        kundeExist.Info.Add(bestillinfo);
                        await _db.SaveChangesAsync();
                    }
                    return true;
                }

            }
            catch
            {
                return false;
            }
        }
    }
}
