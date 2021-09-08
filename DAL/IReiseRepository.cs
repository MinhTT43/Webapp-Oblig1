using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SeasonLine.Models;

namespace SeasonLine.DAL
{
    public interface IReiseRepository
    {
        Task<List<Reise>> AlleReiser();
        Task<Reiser> HentEnReise(int id);
    }
}
