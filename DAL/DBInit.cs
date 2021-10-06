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
                    premiumLugar = 350,
                    dagstur = false

                };

                var kielOslo = new Reiserute
                {
                    avreisested = "Kiel",
                    destinasjon = "Oslo",
                    prisBarn = 250,
                    prisVoksen = 350,
                    standardLugar = 175,
                    premiumLugar = 350,
                    dagstur = false
                };

                var norgeDanmark = new Reiserute
                {
                    avreisested = "Larvik",
                    destinasjon = "Hirtshals",
                    prisBarn = 150,
                    prisVoksen = 250,
                    standardLugar = 125,
                    premiumLugar = 250,
                    dagstur = false

                };

                var danmarkNorge = new Reiserute
                {
                    avreisested = "Hirtshals",
                    destinasjon = "Larvik",
                    prisBarn = 150,
                    prisVoksen = 250,
                    standardLugar = 125,
                    premiumLugar = 250,
                    dagstur = true,
                };

                var sandefjordStrømstad = new Reiserute
                {
                    avreisested = "Sandefjord",
                    destinasjon = "Strømstad",
                    prisBarn = 125,
                    prisVoksen = 200,
                    standardLugar = 100,
                    premiumLugar = 200,
                    dagstur = true,
                };

                var strømstadSandefjord = new Reiserute
                {
                    avreisested = "Strømstad",
                    destinasjon = "Sandefjord",
                    prisBarn = 125,
                    prisVoksen = 200,
                    standardLugar = 100,
                    premiumLugar = 200,
                    dagstur = false
                };

                context.Reiseruter.Add(osloKiel);
                context.Reiseruter.Add(kielOslo);
                context.Reiseruter.Add(norgeDanmark);
                context.Reiseruter.Add(danmarkNorge);
                context.Reiseruter.Add(sandefjordStrømstad);
                context.Reiseruter.Add(strømstadSandefjord);


                // Avreisetid for Oslo-Kiel
                var dateTime1 = new DateTime(2021, 10, 26, 17, 30, 00);
                var dateTime2 = new DateTime(2021, 10, 27, 17, 30, 00);
                var dateTime3 = new DateTime(2021, 10, 28, 17, 30, 00);
                var dateTime4 = new DateTime(2021, 10, 29, 17, 30, 00);
                var dateTime5 = new DateTime(2021, 10, 30, 17, 30, 00);
                var dateTime6 = new DateTime(2021, 11, 01, 17, 30, 00);
                var dateTime7 = new DateTime(2021, 11, 02, 17, 30, 00);
                var dateTime8 = new DateTime(2021, 11, 03, 17, 30, 00);
                var dateTime9 = new DateTime(2021, 11, 04, 17, 30, 00);
                var dateTime10 = new DateTime(2021, 11, 05, 17, 30, 00);
                var dateTime11 = new DateTime(2021, 11, 06, 17, 30, 00);
                var dateTime12 = new DateTime(2021, 11, 07, 17, 30, 00);
                var dateTime13 = new DateTime(2021, 11, 08, 17, 30, 00);
                var dateTime14 = new DateTime(2021, 11, 09, 17, 30, 00);
                var dateTime15 = new DateTime(2021, 11, 10, 17, 30, 00);
                var dateTime16 = new DateTime(2021, 11, 11, 17, 30, 00);
                var dateTime17 = new DateTime(2021, 10, 07, 12, 15, 00);

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
                    avreisetid = dateTime9,
                    rute = osloKiel
                };

                var avreise10 = new Avreise
                {
                    avreisetid = dateTime10,
                    rute = osloKiel
                };

                var avreise11 = new Avreise
                {
                    avreisetid = dateTime11,
                    rute = osloKiel
                };

                var avreise12 = new Avreise
                {
                    avreisetid = dateTime12,
                    rute = osloKiel
                };

                var avreise13 = new Avreise
                {
                    avreisetid = dateTime13,
                    rute = osloKiel
                };

                var avreise14 = new Avreise
                {
                    avreisetid = dateTime14,
                    rute = osloKiel
                };

                var avreise15 = new Avreise
                {
                    avreisetid = dateTime15,
                    rute = osloKiel
                };

                var avreise16 = new Avreise
                {
                    avreisetid = dateTime16,
                    rute = osloKiel
                };

                var avreise17 = new Avreise
                {
                    avreisetid = dateTime1,
                    rute = sandefjordStrømstad
                };

                var avreise18 = new Avreise
                {
                    avreisetid = dateTime1,
                    rute = sandefjordStrømstad
                };

                var avreise19 = new Avreise
                {
                    avreisetid = dateTime2,
                    rute = sandefjordStrømstad
                };

                var avreise20 = new Avreise
                {
                    avreisetid = dateTime3,
                    rute = sandefjordStrømstad
                };

                var avreise21 = new Avreise
                {
                    avreisetid = dateTime4,
                    rute = sandefjordStrømstad
                };

                var avreise22 = new Avreise
                {
                    avreisetid = dateTime5,
                    rute = sandefjordStrømstad
                };

                var avreise23 = new Avreise
                {
                    avreisetid = dateTime6,
                    rute = sandefjordStrømstad
                };

                var avreise24 = new Avreise
                {
                    avreisetid = dateTime7,
                    rute = sandefjordStrømstad
                };

                var avreise25 = new Avreise
                {
                    avreisetid = dateTime8,
                    rute = sandefjordStrømstad
                };

                var avreise26 = new Avreise
                {
                    avreisetid = dateTime9,
                    rute = sandefjordStrømstad
                };

                var avreise27 = new Avreise
                {
                    avreisetid = dateTime10,
                    rute = sandefjordStrømstad
                };

                var avreise28 = new Avreise
                {
                    avreisetid = dateTime11,
                    rute = sandefjordStrømstad
                };

                var avreise29 = new Avreise
                {
                    avreisetid = dateTime17,
                    rute = osloKiel,
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
                context.Avreiser.Add(avreise10);
                context.Avreiser.Add(avreise11);
                context.Avreiser.Add(avreise12);
                context.Avreiser.Add(avreise13);
                context.Avreiser.Add(avreise14);
                context.Avreiser.Add(avreise15);
                context.Avreiser.Add(avreise16);
                context.Avreiser.Add(avreise17);
                context.Avreiser.Add(avreise18);
                context.Avreiser.Add(avreise19);
                context.Avreiser.Add(avreise20);
                context.Avreiser.Add(avreise21);
                context.Avreiser.Add(avreise22);
                context.Avreiser.Add(avreise23);
                context.Avreiser.Add(avreise24);
                context.Avreiser.Add(avreise25);
                context.Avreiser.Add(avreise26);
                context.Avreiser.Add(avreise27);
                context.Avreiser.Add(avreise28);
                context.Avreiser.Add(avreise29);

                context.SaveChanges();

            }
        }
    }
}