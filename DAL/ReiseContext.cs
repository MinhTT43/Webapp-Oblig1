using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using SeasonLine.Controllers;

namespace SeasonLine.DAL
{

    public class Reiser
    {
        [Key]
        public int ReiseID { get; set; }
        public DateTime AvreiseTid { get; set; }
        public virtual ReiseInformasjon ReiseInformasjon { get; set; }
    }

    public class ReiseInformasjon
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string ReiseFra { get; set; }
        public string ReiseTil { get; set; }
        public int PrisBarn { get; set; }
        public int PrisVoksne { get; set; }
        public int PrisLugar { get; set; }
    }
    public class ReiseContext : DbContext
    {
        public ReiseContext(DbContextOptions<ReiseContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<ReiseInformasjon> ReiseInformasjoner { get; set; }
        public DbSet<Reiser> Reiser { get; set; }


    }
}
