using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DeezSalings.Model;

namespace DeezSalings.DAL
{
    public interface IReiseRepository
    {
        Task<List<Reise>> Reiseruter();
        Task<Reiserute> Reiserute(int id);
        Task<List<Avreise>> Avreisetider(int id, int day, int month, int year);
        Task<Avreise> Avreise(int id);
    }
}
