using System;

namespace MonumentsMap.Contracts
{
    public abstract class BaseCommand
    {
        Guid CommandId { get; set; }
        DateTime Timestamp { get; set; }
    }
}
