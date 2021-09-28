using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DeezSalings.DAL
{

    public class Bestilling
    {
        [Key]
        public int billettNr { get; set; }
        public int antallBarn { get; set; }
        public int antallVoksen { get; set; }
        public int antallStandLugar { get; set; }
        public int antallPremLugar { get; set; }
        public DateTime datoBestilt { get; set; }
        public int totalPris { get; set; }
        public virtual Avreise avreise { get; set; }
        public virtual Kunde kunde { get; set; }
    }

    public class Kunde
    {
        [Key]
        public int kId { get; set; }
        public string fornavn { get; set; }
        public string etternavn { get; set; }
        public string epost { get; set; }
        public string telefon { get; set; }
    }

    public class Avreise
    {
        // Oversikt over avreisetider for de ulike ruter
        [Key]
        public int avreiseId { get; set; }
        public DateTime avreisetid { get; set; }
        virtual public Reiserute rute { get; set; }
    }

    public class Reiserute
    {
        // Oversikt over de ulike reiserutene
        [Key]
        public int ruteNr { get; set; }
        public string avreisested { get; set; }
        public string destinasjon { get; set; }

        public int prisBarn { get; set; }
        public int prisVoksen { get; set; }
        public int standardLugar { get; set; }
        public int premiumLugar { get; set; }

    }



    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Bestilling> Bestillinger { get; set; }
        public DbSet<Kunde> Kunder { get; set; }
        public DbSet<Avreise> Avreiser { get; set; }
        public DbSet<Reiserute> Reiseruter { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

    }
}
