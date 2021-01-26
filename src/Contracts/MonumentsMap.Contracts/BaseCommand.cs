using System;

namespace MonumentsMap.Contracts
{
    public abstract class BaseCommand
    {
        public Guid CommandId { get; private set; } = Guid.NewGuid();
        public DateTime Timestamp { get; private set; } = DateTime.Now;
    }
}
