import type { TaskResponse } from '../../types/task';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/date';

interface UpcomingTasksProps {
  tasks: TaskResponse[];
}

function priorityVariant(priority: TaskResponse['priority']) {
  if (priority === 'High') {
    return 'danger' as const;
  }

  if (priority === 'Medium') {
    return 'warning' as const;
  }

  return 'info' as const;
}

export function UpcomingTasks({
  tasks,
}: UpcomingTasksProps) {
  if (tasks.length === 0) {
    return <p className="muted-text">No upcoming tasks.</p>;
  }

  return (
    <div className="upcoming-list">
      {tasks.map((task) => (
        <div className="upcoming-item" key={task.id}>
          <div>
            <strong>{task.title}</strong>
            <span>{formatDate(task.dueDate)}</span>
          </div>

          <Badge variant={priorityVariant(task.priority)}>
            {task.priority}
          </Badge>
        </div>
      ))}
    </div>
  );
}