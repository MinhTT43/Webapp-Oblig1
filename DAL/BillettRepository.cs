using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DeezSalings.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DeezSalings.DAL
{
    public class BillettRepository : IBillettRepository
    {
        private readonly DB _db;

        public BillettRepository(DB db)
        {
            _db = db;
        }

        public async Task<List<Billett>> Billetter()
        {
            try
            {
                List<Bestilling> alleBestillinger = await _db.Bestillinger.ToListAsync();
                List<Billett> alleBilletter = new List<Billett>();

                foreach (var billett in alleBestillinger)
                {
                    Billett nyBillett = new Billett
                    {
                        // Kunde informasjon
                        fornavn = billett.kunde.fornavn,
                        etternavn = billett.kunde.etternavn,
                        epost = billett.kunde.epost,
                        telefon = billett.kunde.telefon,

                        // Bestilling informasjon
                        antallBarn = billett.antallBarn,
                        antallVoksen = billett.antallVoksen,
                        antallStandLugar = billett.antallStandLugar,
                        antallPremLugar = billett.antallPremLugar,
                        datoBestilt = billett.datoBestilt,
                        totalPris = billett.totalPris,

                        // Rute informasjon
                        avreisested = billett.avreise.rute.avreisested,
                        destinasjon = billett.avreise.rute.destinasjon,
                        avreisetid = billett.avreise.avreisetid
                    };

                    alleBilletter.Add(nyBillett);
                }

                return alleBilletter;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> Lagre(Billett b)
        {

            try
            {
                // Finn avreise-id
                Avreise valgtAvreise = await _db.Avreiser.FirstOrDefaultAsync(
                    a => a.rute.avreisested == b.avreisested &&
                    a.avreisetid == b.avreisetid);

                // Finn kunden ved hjelp av epost
                Kunde valgtKunde = await _db.Kunder.FirstOrDefaultAsync(
                    k => k.epost == b.epost);

                // Dersom kunde ikke eksisterer opprett kunde
                if (valgtKunde == null)
                {
                    valgtKunde = new Kunde
                    {
                        fornavn = b.fornavn,
                        etternavn = b.etternavn,
                        epost = b.epost,
                        telefon = b.telefon,
                    };

                    await _db.Kunder.AddAsync(valgtKunde);
                }

                Bestilling nyBestilling = new Bestilling
                {
                    antallBarn = b.antallBarn,
                    antallVoksen = b.antallVoksen,
                    antallStandLugar = b.antallStandLugar,
                    antallPremLugar = b.antallPremLugar,
                    datoBestilt = b.datoBestilt,
                    totalPris = b.totalPris,
                    avreise = valgtAvreise,
                    kunde = valgtKunde,

                };

                await _db.Bestillinger.AddAsync(nyBestilling);
                _db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
