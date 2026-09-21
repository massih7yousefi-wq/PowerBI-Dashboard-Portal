import { Link } from 'react-router-dom';
import type { ActivityResponse } from '../../types/activity';
import { formatDateTime } from '../../utils/date';

interface ActivityListProps {
  activities: ActivityResponse[];
}

export function ActivityList({
  activities,
}: ActivityListProps) {
  if (activities.length === 0) {
    return <p className="muted-text">No recent activity.</p>;
  }

  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div className="activity-item" key={activity.id}>
          <div className="activity-dot" />

          <div className="activity-content">
            <strong>{activity.description}</strong>

            <span>
              {activity.entityType} · {formatDateTime(activity.createdAt)}
            </span>
          </div>

          {activity.entityType === 'Project' && (
            <Link
              to={`/projects/${activity.entityId}`}
              className="table-link"
            >
              View
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}