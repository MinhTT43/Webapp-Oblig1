using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DeezSalings.Model;

namespace DeezSalings.DAL
{
    public interface IReiseRepository
    {
        Task<List<Reise>> Reiser();
        Task<List<Reise>> Avreisetid(int id);
        Task<Reiserute> Reiserute(int id);
        Task<List<Avreise>> valgtAvreisetid(int id, int day, int month, int year);
        Task<Avreise> EnAvreise(int id);
    }
}
