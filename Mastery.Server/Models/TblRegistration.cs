using System;
using System.Collections.Generic;

namespace Mastery.Server.Models;

public partial class TblRegistration
{
    public int UserId { get; set; }

    public string MobileNumber { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Role { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string VerificationCode { get; set; } = null!;

    public DateTime CreatedDate { get; set; }
}
