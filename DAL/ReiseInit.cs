using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using SeasonLine.DAL;

namespace SeasonLine
{
    public class ReiseInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ReiseContext>();
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                var reiseInfo1 = new Rute
                {
                    ReiseFra = "Kiel",
                    ReiseTil = "Oslo",
                    PrisBarn = 100,
                    PrisVoksne = 200,
                    PrisLugar = 300

                };

                var reiseInfo2 = new Rute
                {
                    ReiseFra = "Oslo",
                    ReiseTil = "Kiel",
                    PrisBarn = 100,
                    PrisVoksne = 200,
                    PrisLugar = 300
                };

                var reiseInfo3 = new Rute
                {
                    ReiseFra = "Denmark",
                    ReiseTil = "Norway",
                    PrisBarn = 75,
                    PrisVoksne = 150,
                    PrisLugar = 100
                };
                var reiseInfo4 = new Rute
                {
                    ReiseFra = "Norway",
                    ReiseTil = "Denmark",
                    PrisBarn = 75,
                    PrisVoksne = 150,
                    PrisLugar = 100
                };
                var reiseInfo5 = new Rute
                {
                    ReiseFra = "Strømstad",
                    ReiseTil = "Sandefjord",
                    PrisBarn = 50,
                    PrisVoksne = 100,
                    PrisLugar = 75
                };
                var reiseInfo6 = new Rute
                {
                    ReiseFra = "Sandefjord",
                    ReiseTil = "Strømstad",
                    PrisBarn = 50,
                    PrisVoksne = 100,
                    PrisLugar = 75
                };


                var date1 = new DateTime(2021, 12, 31, 23, 59, 59);
                var reise1 = new Avreise
                {
                    AvreiseTid = date1,
                };
                reise1.Ruter = new List<Rute>();
                reise1.Ruter.Add(reiseInfo1);
                reise1.Ruter.Add(reiseInfo2);
                reise1.Ruter.Add(reiseInfo3);
                reise1.Ruter.Add(reiseInfo4);
                reise1.Ruter.Add(reiseInfo5);
                reise1.Ruter.Add(reiseInfo6);




                var date2 = new DateTime(2022, 1, 1, 00, 00, 00);
                var reise2 = new Avreise
                {
                    AvreiseTid = date2,

                };
                reise2.Ruter = new List<Rute>();
                reise2.Ruter.Add(reiseInfo1);
                reise2.Ruter.Add(reiseInfo2);
                reise2.Ruter.Add(reiseInfo3);
                reise2.Ruter.Add(reiseInfo4);
                reise2.Ruter.Add(reiseInfo5);
                reise2.Ruter.Add(reiseInfo6);



                context.Avreiser.Add(reise1);
                context.Avreiser.Add(reise2);

                context.SaveChanges();

            }
        }
    }
}
