namespace MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public abstract class EditableLocalizedEntity<TEntity> where TEntity : class
    {
        public abstract TEntity CreateEntity();
    }
}