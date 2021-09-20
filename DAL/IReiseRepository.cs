using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SeasonLine.Models;

namespace SeasonLine.DAL
{
    public interface IReiseRepository
    {
        Task<List<Reise>> Reiser();
        Task<List<Reise>> Ruter();
        Task<Rute> EnRute(int id);
        Task<List<Reise>> AvreiseDato(int id);
    }

}
