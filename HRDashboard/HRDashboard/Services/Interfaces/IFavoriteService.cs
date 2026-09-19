using HRDashboard.DTOs.Favorite;

namespace HRDashboard.Services.Interfaces;

public interface IFavoriteService
{
    Task<List<FavoriteResponseDto>> GetUserFavoritesAsync(
        string userId);

    Task<FavoriteResponseDto?> AddAsync(
        Guid projectId,
        string userId);

    Task<bool> RemoveAsync(
        Guid projectId,
        string userId);
}
