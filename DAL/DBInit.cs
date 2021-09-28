using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace DeezSalings.DAL
{
    public class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DB>();
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();


                // Reiseruter
                var osloKiel = new Reiserute
                {
                    avreisested = "Oslo",
                    destinasjon = "Kiel",
                    prisBarn = 250,
                    prisVoksen = 350,
                    standardLugar = 175,
                    premiumLugar = 350
                };

                var kielOslo = new Reiserute
                {
                    avreisested = "Kiel",
                    destinasjon = "Oslo",
                    prisBarn = 250,
                    prisVoksen = 350,
                    standardLugar = 175,
                    premiumLugar = 350
                };

                var norgeDanmark = new Reiserute
                {
                    avreisested = "Norge",
                    destinasjon = "Danmark",
                    prisBarn = 150,
                    prisVoksen = 250,
                    standardLugar = 125,
                    premiumLugar = 250

                };

                var danmarkNorge = new Reiserute
                {
                    avreisested = "Danmark",
                    destinasjon = "Norge",
                    prisBarn = 150,
                    prisVoksen = 250,
                    standardLugar = 125,
                    premiumLugar = 250
                };

                var sandefjordStrømstad = new Reiserute
                {
                    avreisested = "Sandefjord",
                    destinasjon = "Strømstad",
                    prisBarn = 125,
                    prisVoksen = 200,
                    standardLugar = 100,
                    premiumLugar = 200
                };

                var strømstadSandefjord = new Reiserute
                {
                    avreisested = "Strømstad",
                    destinasjon = "Sandefjord",
                    prisBarn = 125,
                    prisVoksen = 200,
                    standardLugar = 100,
                    premiumLugar = 200
                };

                context.Reiseruter.Add(osloKiel);
                context.Reiseruter.Add(kielOslo);
                context.Reiseruter.Add(norgeDanmark);
                context.Reiseruter.Add(danmarkNorge);
                context.Reiseruter.Add(sandefjordStrømstad);
                context.Reiseruter.Add(strømstadSandefjord);


                // Avreisetid
                var dateTime1 = new DateTime(2021, 9, 26, 17, 30, 00);
                var dateTime2 = new DateTime(2021, 9, 27, 17, 30, 00);
                var dateTime3 = new DateTime(2021, 9, 28, 17, 30, 00);
                var dateTime4 = new DateTime(2021, 9, 29, 17, 30, 00);
                var dateTime5 = new DateTime(2021, 9, 30, 17, 30, 00);
                var dateTime6 = new DateTime(2021, 10, 01, 17, 30, 00);
                var dateTime7 = new DateTime(2021, 10, 02, 17, 30, 00);
                var dateTime8 = new DateTime(2021, 10, 03, 17, 30, 00);

                var avreise1 = new Avreise
                {
                    avreisetid = dateTime1,
                    rute = osloKiel,
                };

                var avreise2 = new Avreise
                {
                    avreisetid = dateTime2,
                    rute = osloKiel,
                };

                var avreise3 = new Avreise
                {
                    avreisetid = dateTime3,
                    rute = osloKiel,
                };

                var avreise4 = new Avreise
                {
                    avreisetid = dateTime4,
                    rute = osloKiel,
                };

                var avreise5 = new Avreise
                {
                    avreisetid = dateTime5,
                    rute = osloKiel,
                };

                var avreise6 = new Avreise
                {
                    avreisetid = dateTime6,
                    rute = osloKiel,
                };
                var avreise7 = new Avreise
                {
                    avreisetid = dateTime7,
                    rute = osloKiel,
                };

                var avreise8 = new Avreise
                {
                    avreisetid = dateTime8,
                    rute = osloKiel,
                };

                var avreise9 = new Avreise
                {
                    avreisetid = dateTime8,
                    rute = kielOslo
                };

                context.Avreiser.Add(avreise1);
                context.Avreiser.Add(avreise2);
                context.Avreiser.Add(avreise3);
                context.Avreiser.Add(avreise4);
                context.Avreiser.Add(avreise5);
                context.Avreiser.Add(avreise6);
                context.Avreiser.Add(avreise7);
                context.Avreiser.Add(avreise8);
                context.Avreiser.Add(avreise9);

                context.SaveChanges();

            }
        }
    }
}