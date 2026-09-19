using HRDashboard.Data;
using HRDashboard.DTOs.Project;
using HRDashboard.Models;
using HRDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Services;

public class ProjectService : IProjectService
{
    private readonly AppDbContext _context;
    private readonly IActivityService _activityService;

    public ProjectService(
        AppDbContext context,
        IActivityService activityService)
    {
        _context = context;
        _activityService = activityService;
    }

    public async Task<List<ProjectResponseDto>> GetAllAsync()
    {
        return await _context.Projects
            .AsNoTracking()
            .Include(p => p.Category)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new ProjectResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                EmbedUrl = p.EmbedUrl,
                CategoryId = p.CategoryId,
                CategoryName = p.Category != null
                    ? p.Category.Name
                    : null,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            })
            .ToListAsync();
    }

    public async Task<ProjectResponseDto?> GetByIdAsync(Guid id)
    {
        return await _context.Projects
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.Id == id)
            .Select(p => new ProjectResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                EmbedUrl = p.EmbedUrl,
                CategoryId = p.CategoryId,
                CategoryName = p.Category != null
                    ? p.Category.Name
                    : null,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            })
            .FirstOrDefaultAsync();
    }

    public async Task<ProjectResponseDto> CreateAsync(
        CreateProjectDto dto,
        string userId)
    {
        await ValidateCategoryAsync(dto.CategoryId);

        ValidateEmbedUrl(dto.EmbedUrl);

        var now = DateTime.UtcNow;

        var project = new Project
        {
            Id = Guid.NewGuid(),
            Name = dto.Name.Trim(),
            Description = dto.Description?.Trim(),
            EmbedUrl = dto.EmbedUrl.Trim(),
            CategoryId = dto.CategoryId,
            CreatedAt = now,
            UpdatedAt = now
        };

        _context.Projects.Add(project);

        await _context.SaveChangesAsync();

        await _activityService.LogAsync(
            userId,
            "ProjectCreated",
            $"Project '{project.Name}' was created.",
            "Project",
            project.Id);

        return (await GetByIdAsync(project.Id))!;
    }

    public async Task<ProjectResponseDto?> UpdateAsync(
        Guid id,
        UpdateProjectDto dto,
        string userId)
    {
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project is null)
            return null;

        await ValidateCategoryAsync(dto.CategoryId);

        ValidateEmbedUrl(dto.EmbedUrl);

        project.Name = dto.Name.Trim();
        project.Description = dto.Description?.Trim();
        project.EmbedUrl = dto.EmbedUrl.Trim();
        project.CategoryId = dto.CategoryId;
        project.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        await _activityService.LogAsync(
            userId,
            "ProjectUpdated",
            $"Project '{project.Name}' was updated.",
            "Project",
            project.Id);

        return await GetByIdAsync(project.Id);
    }

    public async Task<bool> DeleteAsync(
        Guid id,
        string userId)
    {
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project is null)
            return false;

        var projectName = project.Name;

        _context.Projects.Remove(project);

        await _context.SaveChangesAsync();

        await _activityService.LogAsync(
            userId,
            "ProjectDeleted",
            $"Project '{projectName}' was deleted.",
            "Project",
            id);

        return true;
    }

    private async Task ValidateCategoryAsync(
        Guid? categoryId)
    {
        if (categoryId is null)
            return;

        var exists = await _context.Categories
            .AnyAsync(c => c.Id == categoryId);

        if (!exists)
        {
            throw new InvalidOperationException(
                "The selected category does not exist.");
        }
    }

    private static void ValidateEmbedUrl(
        string embedUrl)
    {
        if (!Uri.TryCreate(
                embedUrl,
                UriKind.Absolute,
                out var uri))
        {
            throw new InvalidOperationException(
                "EmbedUrl must be a valid URL.");
        }

        if (uri.Scheme != Uri.UriSchemeHttps)
        {
            throw new InvalidOperationException(
                "EmbedUrl must use HTTPS.");
        }
    }
}