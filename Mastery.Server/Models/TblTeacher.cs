using System;
using System.Collections.Generic;

namespace Mastery.Server.Models;

public partial class TblTeacher
{
    public int? UserId { get; set; }

    public int TeacherId { get; set; }

    public string? Skills { get; set; }

    public string? PhotoUrl { get; set; }

    public virtual ICollection<TblCourse> TblCourses { get; set; } = new List<TblCourse>();

    public virtual TblUser? User { get; set; }
}
