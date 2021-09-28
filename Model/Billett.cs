using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace DeezSalings.Model
{
    public class Billett
    {
        // Kunde informasjon
        [RegularExpression(@"^[a-zæøåA-ZÆØÅ. \-]{1,40}$")]
        [Required]
        public string fornavn { get; set; }
        [RegularExpression(@"^[a-zæøåA-ZÆØÅ. \-]{1,40}$")]
        [Required]
        public string etternavn { get; set; }
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")] // Hentet fra https://www.c-sharpcorner.com/blogs/validate-email-address-in-c-sharp1
        [Required]
        public string epost { get; set; }
        [RegularExpression(@"^\(?([0-9 +]{8,})$")]
        [Required]
        public string telefon { get; set; }

        // Bestilling informasjon
        [RegularExpression(@"^\(?([0-9 +]{1,2})$")]
        [Required]
        public int antallBarn { get; set; }
        [RegularExpression(@"^\(?([0-9 +]{1,2})$")]
        [Required]
        public int antallVoksen { get; set; }
        [RegularExpression(@"^\(?([0-9 +]{1,2})$")]
        [Required]
        public int antallStandLugar { get; set; }
        [RegularExpression(@"^\(?([0-9 +]{1,2})$")]
        [Required]
        public int antallPremLugar { get; set; }
        [Required]
        public DateTime datoBestilt { get; set; }
        [RegularExpression(@"^\(?([0-9 +]{1,9})$")]
        [Required]
        public int totalPris { get; set; }

        // Rute informasjon
        [Required]
        public string avreisested { get; set; }
        [Required]
        public string destinasjon { get; set; }
        [Required]
        public DateTime avreisetid { get; set; }
    }
}
