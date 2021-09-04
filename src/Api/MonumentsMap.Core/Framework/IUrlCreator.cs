namespace MonumentsMap.Core.Framework
{
    public interface IUrlCreator
    {
        string Create(string action, string controller, object prms);
    }
}
