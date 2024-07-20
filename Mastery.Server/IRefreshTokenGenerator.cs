namespace Mastery.Server
{
    public interface IRefreshTokenGenerator
    {
        string GenerateToken(string Email);

    }
}
