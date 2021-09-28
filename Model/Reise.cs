using System;
namespace DeezSalings.Model
{
    public class Reise
    {
        // Objektet vi jobber med ved GET / POST
        public int id { get; set; }

        public string avreisested { get; set; }
        public string destinasjon { get; set; }

        public int prisBarn { get; set; }
        public int prisVoken { get; set; }
        public int standardLugar { get; set; }
        public int premiumLugar { get; set; }

        public DateTime avreisetid { get; set; }

    }
}
