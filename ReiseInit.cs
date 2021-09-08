using System;
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

                var reiseInfo1 = new ReiseInformasjon
                {
                    ReiseFra = "Norge",
                    ReiseTil = "Danmark",
                    PrisBarn = 100,
                    PrisVoksne = 200,
                    PrisLugar = 300

                };

                var reiseInfo2 = new ReiseInformasjon
                {
                    ReiseFra = "Oslo",
                    ReiseTil = "Kiel",
                    PrisBarn = 150,
                    PrisVoksne = 250,
                    PrisLugar = 350
                };

                var date1 = new DateTime(2021, 12, 31, 23, 59, 59);
                var reise1 = new Reiser
                {
                    AvreiseTid = date1,
                    ReiseInformasjon = reiseInfo2
                };

                var date2 = new DateTime(2022, 1, 1, 00, 00, 00);
                var reise2 = new Reiser
                {
                    AvreiseTid = date2,
                    ReiseInformasjon = reiseInfo1
                };

                context.Reiser.Add(reise1);
                context.Reiser.Add(reise2);

                context.SaveChanges();

            }
        }
    }
}
