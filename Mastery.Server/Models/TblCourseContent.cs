using System;
using System.Collections.Generic;

namespace Mastery.Server.Models;

public partial class TblCourseContent
{
    public int? CourseId { get; set; }

    public int ContentId { get; set; }

    public string? Heading { get; set; }

    public string? Content { get; set; }

    public virtual TblCourse? Course { get; set; }
}
