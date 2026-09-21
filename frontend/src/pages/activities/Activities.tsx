import { useCallback, useEffect, useState } from 'react';

import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { PageHeader } from '../../components/common/PageHeader';
import { Table } from '../../components/common/Table';

import * as activityService from '../../services/activityService';

import type { ActivityResponse } from '../../types/activity';

import { formatDateTime } from '../../utils/date';
import { getApiErrorMessage } from '../../utils/apiError';

export function Activities() {
  const [activities, setActivities] = useState<
    ActivityResponse[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      setActivities(await activityService.getActivities(100));
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadActivities();
  }, [loadActivities]);

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadActivities}
      />
    );
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Activities"
        description="Audit trail of recent workspace changes."
      />

      {activities.length === 0 ? (
        <EmptyState
          title="No activity yet"
          description="Workspace activity will appear here."
        />
      ) : (
        <Table
          data={activities}
          rowKey={(activity) => activity.id}
          columns={[
            {
              key: 'type',
              header: 'Type',
              render: (activity) => (
                <Badge variant="info">{activity.type}</Badge>
              ),
            },
            {
              key: 'description',
              header: 'Description',
              render: (activity) => (
                <div className="table-primary">
                  <strong>{activity.description}</strong>
                  <span>{activity.entityType}</span>
                </div>
              ),
            },
            {
              key: 'entity',
              header: 'Entity ID',
              render: (activity) => (
                <code className="entity-id">
                  {activity.entityId}
                </code>
              ),
            },
            {
              key: 'created',
              header: 'Date',
              render: (activity) =>
                formatDateTime(activity.createdAt),
            },
          ]}
        />
      )}
    </div>
  );
}