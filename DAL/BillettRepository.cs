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

        // Metode som lagrer billetten til db og returnerer billetten sin id
        public async Task<int> Lagre(Billett b)
        {
            try
            {
                // Hent avreisen
                Avreise valgtAvreise = await _db.Avreiser.FirstOrDefaultAsync(
                    a => a.rute.avreisested == b.avreisested &&
                    a.avreisetid == b.avreisetid);

                // Hent kunde vha. epost
                Kunde valgtKunde = await _db.Kunder.FirstOrDefaultAsync(
                    k => k.epost == b.epost);

                // Opprett kunde om de ikke eksisterer
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

                // Opprett en ny bestilling
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
                return nyBestilling.billettNr;
            }
            catch
            {
                // Nøkkelverdier starter fra 0.
                // -1 blir derfor en ugyldig verdi.
                return -1;
            }
        }

        // Metode for å hente en billett
        public async Task<Billett> Billett(int id)
        {
            try
            {
                Bestilling enBestilling =
                    await _db.Bestillinger.FirstOrDefaultAsync(
                        b => b.billettNr == id);

                Billett enBillett = new Billett
                {
                    fornavn = enBestilling.kunde.fornavn,
                    etternavn = enBestilling.kunde.etternavn,
                    epost = enBestilling.kunde.epost,
                    telefon = enBestilling.kunde.telefon,
                    antallBarn = enBestilling.antallBarn,
                    antallVoksen = enBestilling.antallVoksen,
                    antallStandLugar = enBestilling.antallStandLugar,
                    antallPremLugar = enBestilling.antallPremLugar,
                    datoBestilt = enBestilling.datoBestilt,
                    avreisetid = enBestilling.avreise.avreisetid,
                    totalPris = enBestilling.totalPris,
                    avreisested = enBestilling.avreise.rute.avreisested,
                    destinasjon = enBestilling.avreise.rute.destinasjon,
                };

                return enBillett;
            }
            catch
            {
                return null;
            }
        }
    }
}
