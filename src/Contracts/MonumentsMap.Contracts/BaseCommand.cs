using System;

namespace MonumentsMap.Contracts
{
    public abstract class BaseCommand
    {
        public Guid CommandId { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
