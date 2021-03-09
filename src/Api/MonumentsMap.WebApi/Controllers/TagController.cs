using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Tag;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Contracts.Exceptions;
using System.Threading.Tasks;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class TagController : BaseController
    {
        private readonly ITagService _tagService;

        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tags = await _tagService.GetAsync();
            return Ok(tags);
        }

        [HttpPost]
        [Authorize(Roles = "Editor")]
        public async Task<IActionResult> Post([FromBody] AddTagRequestDto dto)
        {
            string tag = "";
            try
            {
                tag = await _tagService.CreateAsync(dto.TagName);
            }
            catch (ConflictException ex)
            {
                return ConflictResponse(ex.Message);
            }

            return Ok(tag);
        }

        [HttpDelete("{tagName}")]
        [Authorize(Roles = "Editor")]
        public async Task<IActionResult> Delete(string tagName)
        {
            string tag = "";
            try
            {
                tag = await _tagService.RemoveAsync(tagName);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }

            return Ok(tag);
        }
    }
}