using Mastery.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastery.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseContentController : ControllerBase
    {
        private readonly SkillMasteryContext Context;

       public CourseContentController(SkillMasteryContext context)
       {
            Context = context;
       }
        [HttpGet]
        public async Task<ActionResult<TblCourseContent>> GetContent()
        {
            var Content = await Context.TblCourseContents.ToListAsync();

            if (Content == null)
            {
                return NotFound("No content");
            }
            return Ok(Content);
        }
        
        [HttpGet("GetContentById/{ContentId}")]
        public async Task<ActionResult<TblCourseContent>> GetContentById(int ContentId)
        {
            var content = await Context.TblCourseContents.FindAsync(ContentId);

            if (content == null) {
                return NotFound("No Content Found");
            }

            return Ok(content);
        }
      
        [HttpGet("GetContentByCourseId/{CourseId}")]
        public async Task<ActionResult<TblCourseContent>> GetContentByCourseId(int CourseId)
        {
            var Content = await Context.TblCourseContents.Where(e => e.CourseId == CourseId).ToListAsync();
            if (Content == null) {
                return NotFound("No Content");
            }
            return Ok(Content);
        }

        [Route("CreateContent")]
        [HttpPost]
        public async Task<ActionResult> CreateContent([FromBody] TblCourseContent content)
        {
            if(content == null)
            {
                return BadRequest();
            }
            try
            {
                await Context.TblCourseContents.AddAsync(content);
                await Context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetContentById),new {ContentId = content.ContentId});
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
           

        }

     
        [HttpPut("UpdateContent/{ContentId}")]
        public async Task<IActionResult> UpdateContent(int ContentId, [FromBody] TblCourseContent TblContent)
        {
            if (TblContent == null)
            {
                return BadRequest("Content data is null.");
            }

            var updateContent = await Context.TblCourseContents.FindAsync(ContentId);
            if (updateContent == null)
            {
                return NotFound($"Content with ID {ContentId} not found.");
            }

            updateContent.Heading = TblContent.Heading;
            updateContent.Content = TblContent.Content;

            try
            {
                await Context.SaveChangesAsync();
                return Ok("Content Updated");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


       
        [HttpDelete("DeleteContent/{ContentId}")]
        public async Task<IActionResult> DeleteContent(int ContentId)
        {
            var Content = await Context.TblCourseContents.FindAsync(ContentId);
            if (Content == null)
            {
                return NotFound($"Content with ID {ContentId} not found.");
            }
            try
            {
                Context.TblCourseContents.Remove(Content);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error {ex.Message}");
            }
           
        }




    }
}
