using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using SeasonLine.Controllers;

namespace SeasonLine.DAL
{
    public class Kunde
    {
        [Key]
        public int KId { get; set; }
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string Telefon { get; set; }
        public string Epost { get; set; }
        public virtual List<BestillingInformasjon> Info { get; set; }
    }

    public class BestillingInformasjon
    {
        [Key]
        public int BId { get; set; }
        public int AntallBarn { get; set; }
        public int AntallVoksne { get; set; }
        public int AntallLugarer { get; set; }
        public DateTime DatoBestilt { get; set; }
        public string ReiseFra { get; set; }
        public string ReiseTil { get; set; }
        public DateTime AvreiseDato { get; set; }
        public virtual List<Kunde> BestillingID { get; set; }

    }

    public class BestillingContext : DbContext
    {
        public BestillingContext(DbContextOptions<BestillingContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<BestillingInformasjon> BestillingsInfo { get; set; }
        public DbSet<Kunde> Kunder { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
