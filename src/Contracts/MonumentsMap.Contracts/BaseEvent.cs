using System;

namespace MonumentsMap.Contracts
{
    public abstract class BaseEvent
    {
        Guid EventId { get; set; }
        DateTime Timestamp { get; set; }
    }
}