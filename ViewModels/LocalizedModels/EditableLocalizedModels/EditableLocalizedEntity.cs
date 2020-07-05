namespace MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public abstract class EditableLocalizedEntity<TEntity> where TEntity : class
    {
        public int Id { get; set; }
        public abstract TEntity CreateEntity(TEntity entity = null);
    }
}