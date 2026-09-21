import { useCallback, useEffect, useMemo, useState } from 'react';

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
import { Table } from '../../components/common/Table';
import { TaskForm } from '../../components/tasks/TaskForm';

import * as taskService from '../../services/taskService';
import type {
  CreateTask,
  TaskResponse,
} from '../../types/task';

import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/date';
import { getApiErrorMessage } from '../../utils/apiError';

export function Tasks() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] =
    useState<TaskResponse | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [deleteTarget, setDeleteTarget] =
    useState<TaskResponse | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const filteredTasks = useMemo(() => {
    const query = search.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query);

      const matchesStatus =
        !statusFilter || task.status === statusFilter;

      const matchesPriority =
        !priorityFilter || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const statusVariant = (status: TaskResponse['status']) => {
    if (status === 'Done') return 'success' as const;
    if (status === 'InProgress') return 'warning' as const;
    return 'info' as const;
  };

  const priorityVariant = (
    priority: TaskResponse['priority'],
  ) => {
    if (priority === 'High') return 'danger' as const;
    if (priority === 'Medium') return 'warning' as const;
    return 'info' as const;
  };

  const openCreate = () => {
    setEditingTask(null);
    setFormError('');
    setFormOpen(true);
  };

  const openEdit = (task: TaskResponse) => {
    setEditingTask(task);
    setFormError('');
    setFormOpen(true);
  };

  const handleSubmit = async (data: CreateTask) => {
    try {
      setFormLoading(true);
      setFormError('');

      if (editingTask) {
        await taskService.updateTask(editingTask.id, data);
      } else {
        await taskService.createTask(data);
      }

      setFormOpen(false);
      await loadTasks();
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleteLoading(true);

      await taskService.deleteTask(deleteTarget.id);

      setDeleteTarget(null);
      await loadTasks();
    } catch (err) {
      setError(getApiErrorMessage(err));
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadTasks} />;
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Tasks"
        description="Track work, priorities and deadlines."
        actions={
          isAdmin ? (
            <Button onClick={openCreate}>+ New Task</Button>
          ) : undefined
        }
      />

      <div className="toolbar">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search tasks..."
        />

        <Select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
          options={[
            { value: '', label: 'All statuses' },
            { value: 'Todo', label: 'To Do' },
            { value: 'InProgress', label: 'In Progress' },
            { value: 'Done', label: 'Done' },
          ]}
        />

        <Select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value)
          }
          aria-label="Filter by priority"
          options={[
            { value: '', label: 'All priorities' },
            { value: 'Low', label: 'Low' },
            { value: 'Medium', label: 'Medium' },
            { value: 'High', label: 'High' },
          ]}
        />
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description="There are no tasks matching the current filters."
        />
      ) : (
        <Table
          data={filteredTasks}
          rowKey={(task) => task.id}
          columns={[
            {
              key: 'title',
              header: 'Task',
              render: (task) => (
                <div className="table-primary">
                  <strong>{task.title}</strong>
                  <span>
                    {task.description || 'No description'}
                  </span>
                </div>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (task) => (
                <Badge variant={statusVariant(task.status)}>
                  {task.status === 'InProgress'
                    ? 'In Progress'
                    : task.status === 'Todo'
                      ? 'To Do'
                      : 'Done'}
                </Badge>
              ),
            },
            {
              key: 'priority',
              header: 'Priority',
              render: (task) => (
                <Badge variant={priorityVariant(task.priority)}>
                  {task.priority}
                </Badge>
              ),
            },
            {
              key: 'dueDate',
              header: 'Due',
              render: (task) => formatDate(task.dueDate),
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (task) =>
                isAdmin ? (
                  <div className="table-actions">
                    <Button
                      variant="ghost"
                      onClick={() => openEdit(task)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => setDeleteTarget(task)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <span className="muted-text">Read only</span>
                ),
            },
          ]}
        />
      )}

      <Modal
        open={formOpen}
        title={editingTask ? 'Edit Task' : 'Create Task'}
        onClose={() => setFormOpen(false)}
      >
        <TaskForm
          task={editingTask}
          loading={formLoading}
          error={formError}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete task"
        message={`Delete "${deleteTarget?.title ?? ''}"?`}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}