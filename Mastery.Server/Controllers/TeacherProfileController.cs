using Mastery.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastery.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherProfileController : ControllerBase
    {
        private readonly SkillMasteryContext _context;

        public TeacherProfileController(SkillMasteryContext context)
        {
            _context = context;
        }

        [Route("GetAllTeachers")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAllTeachers()
        {
            var result = from teacher in _context.TblTeachers
                         join user in _context.TblUsers on teacher.UserId equals user.UserId into joinedData
                         from user in joinedData.DefaultIfEmpty()
                         select new
                         {
                             TeacherId = teacher.TeacherId,
                             TeacherName = user.Name,
                             MobileNumber = user.MobileNumber,
                             Email = user.Email,
                             Profile = teacher.PhotoUrl,
                             Skills = teacher.Skills,

                         };
            var teachersWithUsers = await result.ToListAsync();


            if (!teachersWithUsers.Any())
            {
                return NotFound("No Teachers data found");
            }

            return new JsonResult(teachersWithUsers);
        }
       
        [HttpGet("GetTeacherById/{UserId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetTeacherById(int UserId)
        {
            var result = from teacher in _context.TblTeachers
                         join user in _context.TblUsers on teacher.UserId equals user.UserId into joinedData
                         from user in joinedData.DefaultIfEmpty()
                         where teacher.UserId == UserId
                         select new
                         {
                             TeacherId = teacher.TeacherId,
                             TeacherName = user != null ? user.Name : null,
                             MobileNumber = user != null ? user.MobileNumber : null,
                             Email = user != null ? user.Email : null,
                             Profile = teacher.PhotoUrl,
                             Skills = teacher.Skills
                         };

            var teacherWithUser = await result.FirstOrDefaultAsync();

            if (teacherWithUser == null)
            {
                return NotFound($"No Teacher data found for UserId: {UserId}");
            }

            return Ok(teacherWithUser);
        }

        [Route("CreateTeacher")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<object>>> CreateTeacher([FromBody] TblTeacher teacher)
        {
            var UserExist = await _context.TblTeachers.FirstOrDefaultAsync(e => e.UserId == teacher.UserId);
            if (UserExist != null)
            {
                return BadRequest("Teacher Already Exist");
            }
            if (teacher == null)
            {
                return BadRequest("Given data is invalid");
            }
            _context.TblTeachers.Add(teacher);
            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTeacherById), new { UserId = teacher.UserId });

            }catch (Exception ex) { 
               return StatusCode(500, ex.Message);
            }
        }

        [Route("UpdateTeacher")]
        [HttpPut]
        public async Task<ActionResult<IEnumerable<object>>> UpdateTeacher([FromBody] TblTeacher teacher)
        {
            var existingTeacher = await _context.TblTeachers.FirstOrDefaultAsync(e => e.UserId == teacher.UserId);
            if (existingTeacher == null)
            {
                return BadRequest("Teacher Not Exist");
            }
            if (teacher == null)
            {
                return BadRequest("Given data is invalid");
            }

            existingTeacher.Skills=teacher.Skills;
            existingTeacher.PhotoUrl=teacher.PhotoUrl;

            _context.TblTeachers.Update(existingTeacher);   
            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTeacherById), new { UserId = existingTeacher.UserId }, existingTeacher);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
