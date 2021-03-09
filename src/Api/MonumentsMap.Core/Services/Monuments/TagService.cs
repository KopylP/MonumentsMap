using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Domain.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonumentsMap.Core.Services.Monuments
{
    class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;

        public TagService(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<string> CreateAsync(string tagName)
        {
            var isExists = await _tagRepository.IsExists(tagName);
            
            if (isExists)
            {
                throw new ConflictException("Tag is already exists");
            }

            var tag = await _tagRepository.Add(tagName);
            await _tagRepository.SaveChangeAsync();

            return tag.TagName;
        }

        public async Task<IList<string>> GetAsync()
        {
            return (await _tagRepository.GetAll())
                .Select(p => p.TagName)
                .ToList();
        }

        public async Task<string> RemoveAsync(string tagName)
        {
            var tag = await _tagRepository.Delete(tagName);

            if (tag == null)
            {
                throw new NotFoundException("Tag not found exception");
            }

            await _tagRepository.SaveChangeAsync();

            return tag.TagName;
        }
    }
}
