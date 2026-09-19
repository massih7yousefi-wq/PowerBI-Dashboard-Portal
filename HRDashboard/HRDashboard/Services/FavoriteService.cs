using HRDashboard.Data;
using HRDashboard.DTOs.Favorite;
using HRDashboard.Models;
using HRDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Services;

public class FavoriteService : IFavoriteService
{
    private readonly AppDbContext _context;

    public FavoriteService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<FavoriteResponseDto>> GetUserFavoritesAsync(
        string userId)
    {
        return await _context.Favorites
            .AsNoTracking()
            .Where(f => f.UserId == userId)
            .OrderByDescending(f => f.CreatedAt)
            .Select(f => new FavoriteResponseDto
            {
                Id = f.Id,
                ProjectId = f.ProjectId,
                ProjectName = f.Project.Name,
                CreatedAt = f.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<FavoriteResponseDto?> AddAsync(
        Guid projectId,
        string userId)
    {
        var projectExists = await _context.Projects
            .AnyAsync(p => p.Id == projectId);

        if (!projectExists)
            return null;

        var exists = await _context.Favorites
            .AnyAsync(f =>
                f.UserId == userId &&
                f.ProjectId == projectId);

        if (exists)
            throw new InvalidOperationException(
                "This project is already in favorites.");

        var favorite = new Favorite
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ProjectId = projectId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Favorites.Add(favorite);

        await _context.SaveChangesAsync();

        return await _context.Favorites
            .AsNoTracking()
            .Where(f => f.Id == favorite.Id)
            .Select(f => new FavoriteResponseDto
            {
                Id = f.Id,
                ProjectId = f.ProjectId,
                ProjectName = f.Project.Name,
                CreatedAt = f.CreatedAt
            })
            .FirstAsync();
    }

    public async Task<bool> RemoveAsync(
        Guid projectId,
        string userId)
    {
        var favorite = await _context.Favorites
            .FirstOrDefaultAsync(f =>
                f.ProjectId == projectId &&
                f.UserId == userId);

        if (favorite is null)
            return false;

        _context.Favorites.Remove(favorite);

        await _context.SaveChangesAsync();

        return true;
    }
}