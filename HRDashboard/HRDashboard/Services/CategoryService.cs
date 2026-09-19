using HRDashboard.Data;
using HRDashboard.DTOs.Category;
using HRDashboard.Models;
using HRDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Services;

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryResponseDto>> GetAllAsync()
    {
        return await _context.Categories
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .Select(c => ToDto(c))
            .ToListAsync();
    }

    public async Task<CategoryResponseDto?> GetByIdAsync(Guid id)
    {
        return await _context.Categories
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Select(c => ToDto(c))
            .FirstOrDefaultAsync();
    }

    public async Task<CategoryResponseDto> CreateAsync(
        CreateCategoryDto dto)
    {
        var exists = await _context.Categories
            .AnyAsync(c => c.Name.ToLower() == dto.Name.Trim().ToLower());

        if (exists)
            throw new InvalidOperationException(
                "A category with this name already exists.");

        var category = new Category
        {
            Id = Guid.NewGuid(),
            Name = dto.Name.Trim(),
            Description = dto.Description?.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _context.Categories.Add(category);

        await _context.SaveChangesAsync();

        return ToDto(category);
    }

    public async Task<CategoryResponseDto?> UpdateAsync(
        Guid id,
        UpdateCategoryDto dto)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category is null)
            return null;

        var exists = await _context.Categories
            .AnyAsync(c =>
                c.Id != id &&
                c.Name.ToLower() == dto.Name.Trim().ToLower());

        if (exists)
            throw new InvalidOperationException(
                "A category with this name already exists.");

        category.Name = dto.Name.Trim();
        category.Description = dto.Description?.Trim();

        await _context.SaveChangesAsync();

        return ToDto(category);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category is null)
            return false;

        var hasProjects = await _context.Projects
            .AnyAsync(p => p.CategoryId == id);

        if (hasProjects)
            throw new InvalidOperationException(
                "Cannot delete a category that is assigned to projects.");

        _context.Categories.Remove(category);

        await _context.SaveChangesAsync();

        return true;
    }

    private static CategoryResponseDto ToDto(Category category)
    {
        return new CategoryResponseDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            CreatedAt = category.CreatedAt
        };
    }
}