using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SeasonLine.Models;

namespace SeasonLine.DAL
{
    public interface IBestillingRepository
    {
        Task<List<Bestilling>> AlleBestillinger();
        Task<Boolean> NyBestilling(Bestilling nyBestilling);

    }
}
