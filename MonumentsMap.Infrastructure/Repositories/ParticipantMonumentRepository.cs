using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class ParticipantMonumentRepository : Repository<ParticipantMonument>,
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
                .Where(p => p.MonumentId == monumentId)
                .Select(p => p.Participant)
                .ToListAsync();
        }
    }
}