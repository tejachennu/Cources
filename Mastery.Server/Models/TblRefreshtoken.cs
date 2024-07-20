using System;
using System.Collections.Generic;

namespace Mastery.Server.Models;

public partial class TblRefreshtoken
{
    public string Email { get; set; } = null!;

    public string? TokenId { get; set; }

    public string? RefreshToken { get; set; }

    public bool? IsActive { get; set; }
}
