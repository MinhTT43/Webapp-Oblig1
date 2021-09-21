using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace SeasonLine.DAL
{
    public class BestillingInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<BestillingContext>();
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

            }
        }
    }
}
