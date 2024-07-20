using Mastery.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastery.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly SkillMasteryContext _context;

        public AccessController(SkillMasteryContext skillMastery)
        {
            _context = skillMastery;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblUser>>> GetUsers(string query = null)
        {
            if (string.IsNullOrEmpty(query))
            {
                return await _context.TblUsers.ToListAsync();
            }

            var users = await _context.TblUsers.Where(u => u.Name.Contains(query)).ToListAsync();

            return Ok(users);
        }



        [HttpPut("Permission")]
        public async Task<ActionResult> MakeUser(int UserId ,string UpdateRole )
        {
            var User = await _context.TblUsers.FindAsync(UserId);
            if (User == null)
            {
                return BadRequest();
            }

            User.Role = UpdateRole;
            _context.TblUsers.Update(User);
            await _context.SaveChangesAsync();

            return Ok("Updated");

        }


    }
}
