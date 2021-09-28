using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DeezSalings.Model;

namespace DeezSalings.DAL
{
    public interface IBillettRepository
    {
        Task<List<Billett>> Billetter();
        Task<bool> Lagre(Billett billett);
    }
}
