using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.Paging;
using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Framework.Enums.Monuments;
using MonumentsMap.Infrastructure.Persistence;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class MonumentRepository : FilterRepository<Monument, MonumentFilterParameters>, IMonumentRepository
    {
        public MonumentRepository(ApplicationContext context) : base(context)
        {
        }

        public override async Task<PagingList<Monument>> Filter(MonumentFilterParameters parameters, params Expression<Func<Monument, object>>[] includes)
        {

            var monuments = dbSet.AsQueryable();

            if (!parameters.Hidden)
            {
                monuments = monuments.Where(p => p.Accepted);
            }

            if (parameters.Statuses.Any())
            {
                monuments =
                    from monument in monuments
                    where parameters.Statuses.Contains(monument.StatusId)
                    select monument;
            }
            if (parameters.Conditions.Any())
            {
                monuments =
                    from monument in monuments
                    where parameters.Conditions.Contains(monument.ConditionId)
                    select monument;
            }
            if (parameters.Cities.Any())
            {
                monuments =
                    from monument in monuments
                    where parameters.Cities.Contains(monument.CityId)
                    select monument;
            }

            if (includes != null)
                foreach (var include in includes)
                    monuments = monuments.Include(include);

            monuments = (await monuments.ToListAsync())
                .AsQueryable();


            if (parameters.StartYear != null)
            {
                monuments =
                    from monument in monuments
                    where IfRangeInStartYear(parameters.StartYear.GetValueOrDefault(), RangeByPeriod(monument.Year, monument.Period))
                    select monument;
            }
            if (parameters.EndYear != null)
            {
                monuments =
                    from monument in monuments
                    where IfRangeInEndYear(parameters.EndYear.GetValueOrDefault(), RangeByPeriod(monument.Year, monument.Period))
                    select monument;
            }

            return await PagingList<Monument>.ToPagedListAsync(monuments, parameters.PageNumber, parameters.PageSize);
        }

        private bool IfRangeInEndYear(int endYear, (int startYear, int endYear) range) => endYear >= range.startYear;
        private bool IfRangeInStartYear(int startYear, (int startYear, int endYear) range) => startYear <= range.endYear;

        private (int, int) RangeByPeriod(int year, Period period)
        {
            return period switch
            {
                Period.Year => (year, year),
                Period.StartOfCentury => ((year - 1) * 100, ((year - 1) * 100 + 30)), //[00, 30]
                Period.MiddleOfCentury => ((year - 1) * 100 + 31, (year - 1) * 100 + 70),//[41, 70]
                Period.EndOfCentury => ((year - 1) * 100 + 71, year * 100 - 1),//[71, 99]
                Period.Decades => (year, year + 9),
                _ => (year, year)
            };
        }
    }
}