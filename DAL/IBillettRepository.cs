using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DeezSalings.Model;

namespace DeezSalings.DAL
{
    public interface IBillettRepository
    {
        Task<int> Lagre(Billett billett);
        Task<Billett> Billett(int id);
    }
}
