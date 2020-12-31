using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class StatusRepository
    : Repository<Status>,
    IStatusRepository
    {
        public StatusRepository(ApplicationContext context) : base(context)
        {
        }
    }
}