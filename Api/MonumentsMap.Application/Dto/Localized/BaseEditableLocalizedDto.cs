namespace MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto
{
    public abstract class BaseEditableLocalizedDto<TEntity> where TEntity : class
    {
        public int Id { get; set; }
        public abstract TEntity CreateEntity(TEntity entity = null);
    }
}