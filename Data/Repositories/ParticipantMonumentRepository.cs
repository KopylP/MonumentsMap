using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data.Repositories
{
    public class ParticipantMonumentRepository : Repository<ParticipantMonument, ApplicationContext>,
        IParticipantMonumentRepository
    {

        public ParticipantMonumentRepository(ApplicationContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Participant>> GetParticipantsByMonumentWithLocalizationsAsync(int monumentId)
        {
            return await dbSet
                .Include(p => p.Participant)
                .ThenInclude(p => p.Name)
                .ThenInclude(p => p.Localizations)
                .Select(p => p.Participant)
                .ToListAsync();
        }
    }
}