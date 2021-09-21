using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SeasonLine.Models;

namespace SeasonLine.DAL
{
    public interface IBestillingRepository
    {
        Task<List<Bestilling>> AlleBestillinger();
        Task<bool> NyBestilling(Bestilling nyBestilling);

    }
}
