using System;
using System.ComponentModel.DataAnnotations;

namespace SeasonLine.Models
{
    public class Bestilling
    {
        // Bestilling ID
        public int BestID { get; set; }

        // Kunde informasjon
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ. \-]{2,20}$")]
        public string Fornavn { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}$")]
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
