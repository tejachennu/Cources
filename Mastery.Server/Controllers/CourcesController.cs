using Mastery.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastery.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourcesController : ControllerBase
    {
       
        private readonly SkillMasteryContext context;

        public CourcesController(SkillMasteryContext skillMastery)
        {
            context = skillMastery;
        }

        [Route("GetallCources")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblCourse>>>GetallCources()
        {
            var cources = await context.TblCourses.ToListAsync();
            return Ok(cources);
        }

        [HttpGet("{Courseid}")]
        public async Task<ActionResult> GetCourseById(int Courseid)
        {
            var course = await context.TblCourses.FirstOrDefaultAsync(e => e.CourseId == Courseid);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }

        [Route("CreateCourse")]
        [HttpPost]
        public async Task<IActionResult> CreateCourse([FromBody] TblCourse course)
        {
            if(course == null)
            {
                return BadRequest();
            }
            context.Add(course);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCourseById), new { CourseId = course.CourseId }, course);
        }

        [HttpPut("UpdateCourse/{Courseid}")]
        public async Task<IActionResult> UpdateCourse(int Courseid,[FromBody]TblCourse Course)
        {
            var UpdateCourse = await context.TblCourses.FirstOrDefaultAsync(e => e.CourseId == Courseid);
            
            if(UpdateCourse.CourseId != Courseid || Course == null)
            {
                return BadRequest("Data mismatch");
            }

            // Update the properties
            UpdateCourse.TeacherId = Course.TeacherId;
            UpdateCourse.CourseName = Course.CourseName;
            UpdateCourse.CoursePhotoUrl = Course.CoursePhotoUrl;
            UpdateCourse.Price = Course.Price;
            UpdateCourse.StartTime = Course.StartTime;
            UpdateCourse.EndTime = Course.EndTime;
            UpdateCourse.Duration = Course.Duration;
            UpdateCourse.Description = Course.Description;
            UpdateCourse.CourseDate = Course.CourseDate;

            try
            {
                await context.SaveChangesAsync();
                return NoContent();
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex);
            }
        }

        [HttpDelete("DeleteCourse/{CourseId}")]
        public async Task<IActionResult> DeleteCourse(int CourseId)
        {
            var DeleteCourse = await context.TblCourses.FirstOrDefaultAsync(e => e.CourseId == CourseId);
            var CourseContent = await context.TblCourseContents.Where(e => e.CourseId == CourseId).ToListAsync();

            try
            {
                context.TblCourseContents.RemoveRange(CourseContent);
                context.TblCourses.Remove(DeleteCourse);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex);
            }
        }
    }
}
