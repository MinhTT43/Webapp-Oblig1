using System;
namespace SeasonLine.Models
{
    public class Bestilling
    {
        // Bestilling ID
        public int BestID { get; set; }

        // Kunde informasjon
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string Telefon { get; set; }
        public string Epost { get; set; }

        // Informasjon om antall
        public int AntallBarn { get; set; }
        public int AntallVoksne { get; set; }
        public int AntallLugarer { get; set; }

        // Informasjon om bestilling
        public DateTime DatoBestilt { get; set; }
        public string ReiseFra { get; set; }
        public string ReiseTil { get; set; }
        public DateTime AvreiseDato { get; set; }

    }
}
