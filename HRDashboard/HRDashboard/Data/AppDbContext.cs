using HRDashboard.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HRDashboard.Data;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects => Set<Project>();

    public DbSet<BiTask> BiTasks => Set<BiTask>();

    public DbSet<Metric> Metrics => Set<Metric>();

    public DbSet<Insight> Insights => Set<Insight>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Favorite> Favorites => Set<Favorite>();

    public DbSet<Activity> Activities => Set<Activity>();

    protected override void OnModelCreating(
        ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // -------------------------------------------------
        // Project
        // -------------------------------------------------

        builder.Entity<Project>(entity =>
        {
            entity.HasKey(p => p.Id);

            entity.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(p => p.Description)
                .HasMaxLength(2000);

            entity.Property(p => p.EmbedUrl)
                .IsRequired()
                .HasMaxLength(2000);

            entity.HasOne(p => p.Category)
                .WithMany(c => c.Projects)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            entity.HasIndex(p => p.CategoryId);
        });

        // -------------------------------------------------
        // Category
        // -------------------------------------------------

        builder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);

            entity.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(c => c.Description)
                .HasMaxLength(1000);

            entity.HasIndex(c => c.Name)
                .IsUnique();
        });

        // -------------------------------------------------
        // BI Task
        // -------------------------------------------------

        builder.Entity<BiTask>(entity =>
        {
            entity.HasKey(t => t.Id);

            entity.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(t => t.Description)
                .HasMaxLength(2000);

            entity.Property(t => t.Status)
                .HasConversion<string>()
                .HasMaxLength(30);

            entity.Property(t => t.Priority)
                .HasConversion<string>()
                .HasMaxLength(30);

            entity.HasIndex(t => t.Status);

            entity.HasIndex(t => t.Priority);

            entity.HasIndex(t => t.DueDate);
        });

        // -------------------------------------------------
        // Metric
        // -------------------------------------------------

        builder.Entity<Metric>(entity =>
        {
            entity.HasKey(m => m.Id);

            entity.Property(m => m.Name)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(m => m.Description)
                .HasMaxLength(2000);

            entity.Property(m => m.Category)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(m => m.Definition)
                .IsRequired()
                .HasMaxLength(4000);

            entity.Property(m => m.Source)
                .IsRequired()
                .HasMaxLength(500);

            entity.Property(m => m.Unit)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(m => m.TargetValue)
                .HasPrecision(18, 4);

            entity.HasIndex(m => m.Category);
        });

        // -------------------------------------------------
        // Insight
        // -------------------------------------------------

        builder.Entity<Insight>(entity =>
        {
            entity.HasKey(i => i.Id);

            entity.Property(i => i.Title)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(i => i.Description)
                .HasMaxLength(4000);

            entity.Property(i => i.Type)
                .HasConversion<string>()
                .HasMaxLength(30);

            entity.Property(i => i.Severity)
                .HasConversion<string>()
                .HasMaxLength(30);

            entity.HasIndex(i => i.CreatedAt);
        });

        // -------------------------------------------------
        // Favorite
        // -------------------------------------------------

        builder.Entity<Favorite>(entity =>
        {
            entity.HasKey(f => f.Id);

            entity.Property(f => f.UserId)
                .IsRequired();

            entity.HasOne(f => f.User)
                .WithMany()
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(f => f.Project)
                .WithMany()
                .HasForeignKey(f => f.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(f => new
            {
                f.UserId,
                f.ProjectId
            })
            .IsUnique();

            entity.HasIndex(f => f.UserId);
        });

        // -------------------------------------------------
        // Activity
        // -------------------------------------------------

        builder.Entity<Activity>(entity =>
        {
            entity.HasKey(a => a.Id);

            entity.Property(a => a.UserId)
                .IsRequired();

            entity.Property(a => a.Type)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(a => a.Description)
                .IsRequired()
                .HasMaxLength(1000);

            entity.Property(a => a.EntityType)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(a => a.UserId);

            entity.HasIndex(a => a.CreatedAt);

            entity.HasIndex(a => new
            {
                a.EntityType,
                a.EntityId
            });
        });
    }
}