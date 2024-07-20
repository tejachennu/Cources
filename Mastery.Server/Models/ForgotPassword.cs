namespace Mastery.Server.Models
{
    public class ForgotPassword
    {
        public string Email { get; set; }
        public string VerificationCode { get; set; }
        public string Password { get; set; }
    }
}
