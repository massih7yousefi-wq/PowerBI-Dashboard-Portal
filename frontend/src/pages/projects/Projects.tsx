import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import * as projectService from '../../services/projectService';
import * as categoryService from '../../services/categoryService';
import * as favoriteService from '../../services/favoriteService';

import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { Modal } from '../../components/common/Modal';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchInput } from '../../components/common/SearchInput';
import { Select } from '../../components/common/Select';
import { ProjectForm } from '../../components/projects/ProjectForm';

import type { CategoryResponse } from '../../types/category';
import type {
  CreateProject,
  ProjectResponse,
} from '../../types/project';

import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/date';
import { getApiErrorMessage } from '../../utils/apiError';

export function Projects() {
  const { user } = useAuth();

  const isAdmin = user?.role === 'Admin';

  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(),
  );

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [favoriteLoading, setFavoriteLoading] = useState<
    Set<string>
  >(new Set());

  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] =
    useState<ProjectResponse | null>(null);

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [deleteTarget, setDeleteTarget] =
    useState<ProjectResponse | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  /*
   * Load projects, categories and the current user's favorites.
   */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const [projectData, categoryData] = await Promise.all([
        projectService.getProjects(),
        categoryService.getCategories(),
      ]);

      setProjects(projectData);
      setCategories(categoryData);

      /*
       * Favorites belong to the authenticated user.
       *
       * The backend protects this endpoint with [Authorize],
       * so this request is only meaningful after login.
       */
      if (user) {
        const favoriteData =
          await favoriteService.getFavorites();

        setFavorites(
          new Set(
            favoriteData.map(
              (favorite) => favorite.projectId,
            ),
          ),
        );
      } else {
        setFavorites(new Set());
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  /*
   * Search and category filtering are handled on the client
   * because the current backend GET /projects endpoint does
   * not expose filtering query parameters.
   */
  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.description
          ?.toLowerCase()
          .includes(query) ||
        project.categoryName
          ?.toLowerCase()
          .includes(query);

      const matchesCategory =
        !categoryFilter ||
        project.categoryId === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [projects, search, categoryFilter]);

  const openCreate = () => {
    setEditingProject(null);
    setFormError('');
    setFormOpen(true);
  };

  const openEdit = (project: ProjectResponse) => {
    setEditingProject(project);
    setFormError('');
    setFormOpen(true);
  };

  const handleSubmit = async (data: CreateProject) => {
    try {
      setFormLoading(true);
      setFormError('');

      if (editingProject) {
        await projectService.updateProject(
          editingProject.id,
          data,
        );
      } else {
        await projectService.createProject(data);
      }

      setFormOpen(false);

      await loadData();
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeleteLoading(true);
      setError('');

      await projectService.deleteProject(deleteTarget.id);

      /*
       * Remove the deleted project from local favorites too.
       * The backend project deletion is the source of truth,
       * but this keeps the current UI immediately consistent.
       */
      setFavorites((current) => {
        const next = new Set(current);

        next.delete(deleteTarget.id);

        return next;
      });

      setDeleteTarget(null);

      await loadData();
    } catch (err) {
      setError(getApiErrorMessage(err));
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  /*
   * Add/remove a favorite through the real backend API.
   *
   * POST   /api/favorites/{projectId}
   * DELETE /api/favorites/{projectId}
   */
  const handleToggleFavorite = async (projectId: string) => {
    if (!user) {
      return;
    }

    const isFavorite = favorites.has(projectId);

    setFavoriteLoading((current) => {
      const next = new Set(current);

      next.add(projectId);

      return next;
    });

    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(projectId);

        setFavorites((current) => {
          const next = new Set(current);

          next.delete(projectId);

          return next;
        });
      } else {
        await favoriteService.addFavorite(projectId);

        setFavorites((current) => {
          const next = new Set(current);

          next.add(projectId);

          return next;
        });
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setFavoriteLoading((current) => {
        const next = new Set(current);

        next.delete(projectId);

        return next;
      });
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error && projects.length === 0) {
    return <ErrorState message={error} onRetry={loadData} />;
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Projects"
        description="Manage dashboards and embedded BI workspaces."
        actions={
          isAdmin ? (
            <Button onClick={openCreate}>
              + New Project
            </Button>
          ) : undefined
        }
      />

      {error && projects.length > 0 && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

      <div className="toolbar">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search projects..."
        />

        <Select
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(event.target.value)
          }
          aria-label="Filter by category"
          options={[
            {
              value: '',
              label: 'All categories',
            },
            ...categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
          ]}
        />
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description={
            search || categoryFilter
              ? 'Try changing your filters.'
              : 'Create your first project to get started.'
          }
          action={
            isAdmin && !search && !categoryFilter ? (
              <Button onClick={openCreate}>
                Create Project
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="project-grid">
          {filteredProjects.map((project) => {
            const isFavorite = favorites.has(project.id);
            const isFavoriteLoading =
              favoriteLoading.has(project.id);

            return (
              <article
                className="project-card"
                key={project.id}
              >
                <div className="project-card-top">
                  <Badge>
                    {project.categoryName ??
                      'Uncategorized'}
                  </Badge>

                  <button
                    type="button"
                    className={`favorite-button ${
                      isFavorite
                        ? 'favorite-active'
                        : ''
                    }`}
                    onClick={() =>
                      void handleToggleFavorite(
                        project.id,
                      )
                    }
                    disabled={isFavoriteLoading}
                    aria-label={
                      isFavorite
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                    aria-pressed={isFavorite}
                    title={
                      isFavorite
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                  >
                    {isFavorite ? '★' : '☆'}
                  </button>
                </div>

                <h2>{project.name}</h2>

                <p>
                  {project.description ||
                    'No description available.'}
                </p>

                <div className="project-card-meta">
                  <span>
                    Updated{' '}
                    {formatDate(project.updatedAt)}
                  </span>
                </div>

                <div className="project-card-actions">
                  <Link
                    className="button button-secondary"
                    to={`/projects/${project.id}`}
                  >
                    Open
                  </Link>

                  {isAdmin && (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          openEdit(project)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() =>
                          setDeleteTarget(project)
                        }
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Modal
        open={formOpen}
        title={
          editingProject
            ? 'Edit Project'
            : 'Create Project'
        }
        onClose={() => {
          if (!formLoading) {
            setFormOpen(false);
          }
        }}
        width="medium"
      >
        <ProjectForm
          project={editingProject}
          categories={categories}
          loading={formLoading}
          error={formError}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete project"
        message={`Delete "${
          deleteTarget?.name ?? ''
        }"? This action cannot be undone.`}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!deleteLoading) {
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}