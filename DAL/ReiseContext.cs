using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using SeasonLine.Controllers;

namespace SeasonLine.DAL
{

    public class Avreise
    {
        [Key]
        public int AvreiseID { get; set; }
        public DateTime AvreiseTid { get; set; }
        public virtual List<Rute> Ruter { get; set; }
    }

    public class Rute
    {
        [Key]
        public int Id { get; set; }
        public string ReiseFra { get; set; }
        public string ReiseTil { get; set; }
        public int PrisBarn { get; set; }
        public int PrisVoksne { get; set; }
        public int PrisLugar { get; set; }
        public virtual List<Avreise> Avreiser { get; set; }
    }
    public class ReiseContext : DbContext
    {
        public ReiseContext(DbContextOptions<ReiseContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Rute> Rute { get; set; }
        public DbSet<Avreise> Avreiser { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

    }
}
