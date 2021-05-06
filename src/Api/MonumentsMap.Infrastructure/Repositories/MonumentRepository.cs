using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.Paging;
using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Framework.Enums;
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

            if (parameters.ConditionAbbreviations.Any())
            {
                monuments = monuments.Include(p => p.Condition)
                    .Where(p => parameters.ConditionAbbreviations.Contains(p.Condition.Abbreviation));
            }

            if (parameters.StatusAbbreviations.Any())
            {
                monuments = monuments.Include(p => p.Status)
                    .Where(p => parameters.StatusAbbreviations.Contains(p.Status.Abbreviation));
            }

            if (parameters.Tags.Any())
            {
                monuments = monuments.Include(p => p.Tags);
                foreach (var tag in parameters.Tags)
                {
                    monuments = monuments.Where(p => p.Tags.Select(p => p.TagName).Contains(tag));
                }
            }

            if (parameters.SortBy == SortBy.CREATED_AT)
            {
                monuments = parameters.SortDirection switch
                {
                    SortDirection.ASC => monuments.OrderBy(p => p.CreatedAt),
                    SortDirection.DESC => monuments.OrderByDescending(p => p.CreatedAt),
                    _ => throw new NotImplementedException()
                };
            }
            
            if (parameters.SortBy == SortBy.NAME)
            {
                monuments = monuments
                    .Include(p => p.Name)
                    .ThenInclude(p => p.Localizations);
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

            if (parameters.SortBy == SortBy.YEAR)
            {
                monuments = parameters.SortDirection switch
                {
                    SortDirection.ASC => monuments.OrderBy(p => GetYearForOrderByPeriod(p.Year, p.Period)),
                    SortDirection.DESC => monuments.OrderByDescending(p => GetYearForOrderByPeriod(p.Year, p.Period)),
                    _ => throw new NotImplementedException()
                };
            }

            if (parameters.SortBy == SortBy.NAME)
            {
                monuments = parameters.SortDirection switch
                {
                    SortDirection.ASC => monuments.OrderBy(p => p.Name.Localizations.Where(p => p.CultureCode == parameters.CultureCode).FirstOrDefault().Value),
                    SortDirection.DESC => monuments.OrderByDescending(p => p.Name.Localizations.Where(p => p.CultureCode == parameters.CultureCode).FirstOrDefault().Value),
                    _ => throw new NotImplementedException()
                };
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

        private int GetYearForOrderByPeriod(int year, Period period)
        {
            return period switch
            {
                Period.Year => year,
                Period.StartOfCentury => (year - 1) * 100,
                Period.MiddleOfCentury => (year - 1) * 100 + 50,
                Period.EndOfCentury => year * 100 - 1,
                Period.Decades => year,
                _ => year
            };
        }

        public async Task<int> GetMinimumMonumentsYearAsync()
        {
            var monuments = await dbSet.AsQueryable().ToListAsync();
            try
            {
                return monuments
                    .Min(p => GetYearForOrderByPeriod(p.Year, p.Period));
            }
            catch
            {
                return 100;
            }
        }
    }
}