using System;
namespace SeasonLine.Models
{
    public class Reise
    {
        // Reise ID
        public int ReiseID { get; set; }

        // Pris informasjon
        public int PrisBarn { get; set; }
        public int PrisVoksne { get; set; }
        public int PrisLugar { get; set; }

        // Reise informasjon
        // TODO: Bytt datatype om til date
        public string ReiseTil { get; set; }
        public string ReiseFra { get; set; }
        public DateTime AvreiseTid { get; set; }

    }
}
