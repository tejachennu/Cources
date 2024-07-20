using System;
using System.Collections.Generic;

namespace Mastery.Server.Models;

public partial class TblCourse
{
    public int CourseId { get; set; }

    public int? TeacherId { get; set; }

    public string CourseName { get; set; } = null!;

    public string? CoursePhotoUrl { get; set; }

    public decimal? Price { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string? Duration { get; set; }

    public string? Description { get; set; }

    public DateOnly? CourseDate { get; set; }

    public virtual ICollection<TblCourseContent> TblCourseContents { get; set; } = new List<TblCourseContent>();

    public virtual TblTeacher? Teacher { get; set; }
}
