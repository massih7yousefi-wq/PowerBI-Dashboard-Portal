import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { Card } from '../../components/common/Card';

import * as projectService from '../../services/projectService';
import type { ProjectResponse } from '../../types/project';

import { useAuth } from '../../hooks/useAuth';
import { formatDateTime } from '../../utils/date';
import { getApiErrorMessage } from '../../utils/apiError';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] =
    useState<ProjectResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProject = useCallback(async () => {
    if (!id) {
      setError('Invalid project ID.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const data = await projectService.getProject(id);
      setProject(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadProject();
  }, [loadProject]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !project) {
    return (
      <ErrorState
        message={error || 'Project not found.'}
        onRetry={loadProject}
      />
    );
  }

  return (
    <div className="page-stack">
      <div className="back-link-wrapper">
        <Link to="/projects" className="back-link">
          ← Back to Projects
        </Link>
      </div>

      <div className="project-detail-header">
        <div>
          <Badge>{project.categoryName ?? 'Uncategorized'}</Badge>
          <h1>{project.name}</h1>
          <p>{project.description ?? 'No description.'}</p>
        </div>

        {user?.role === 'Admin' && (
          <Button
            variant="secondary"
            onClick={() => navigate('/projects')}
          >
            Manage Projects
          </Button>
        )}
      </div>

      <div className="detail-meta-grid">
        <Card>
          <span className="detail-label">Created</span>
          <strong>{formatDateTime(project.createdAt)}</strong>
        </Card>

        <Card>
          <span className="detail-label">Last updated</span>
          <strong>{formatDateTime(project.updatedAt)}</strong>
        </Card>

        <Card>
          <span className="detail-label">Category</span>
          <strong>
            {project.categoryName ?? 'Uncategorized'}
          </strong>
        </Card>
      </div>

      <Card className="embed-card">
        <div className="section-heading">
          <div>
            <h2>Dashboard</h2>
            <p>Embedded business intelligence workspace</p>
          </div>
        </div>

        <div className="embed-container">
          <iframe
            src={project.embedUrl}
            title={`${project.name} dashboard`}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>
    </div>
  );
}