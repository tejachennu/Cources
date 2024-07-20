using System;
using System.Collections.Generic;

namespace Mastery.Server.Models;

public partial class TblUser
{
    public long? MobileNumber { get; set; }

    public string? Name { get; set; }

    public string Password { get; set; } = null!;

    public string? Email { get; set; }

    public string? Role { get; set; }

    public string? IsActive { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<TblTeacher> TblTeachers { get; set; } = new List<TblTeacher>();
}
