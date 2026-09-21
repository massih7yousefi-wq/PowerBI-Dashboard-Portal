import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';

import type {
  CreateTask,
  TaskResponse,
} from '../../types/task';

import { toDateTimeLocal, toUtcIso } from '../../utils/date';

interface TaskFormProps {
  task?: TaskResponse | null;
  loading?: boolean;
  error?: string;
  onSubmit: (data: CreateTask) => Promise<void>;
  onCancel: () => void;
}

export function TaskForm({
  task,
  loading = false,
  error = '',
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] =
    useState<CreateTask['status']>('Todo');
  const [priority, setPriority] =
    useState<CreateTask['priority']>('Medium');
  const [dueDate, setDueDate] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setTitle(task?.title ?? '');
    setDescription(task?.description ?? '');
    setStatus(task?.status ?? 'Todo');
    setPriority(task?.priority ?? 'Medium');
    setDueDate(toDateTimeLocal(task?.dueDate ?? null));
  }, [task]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Task title is required.');
      return;
    }

    await onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      status,
      priority,
      dueDate: toUtcIso(dueDate),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-stack">
      <Input
        id="task-title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={200}
        required
      />

      <Textarea
        id="task-description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        maxLength={2000}
        rows={4}
      />

      <div className="form-grid">
        <Select
          id="task-status"
          label="Status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as CreateTask['status'])
          }
          options={[
            { value: 'Todo', label: 'To Do' },
            { value: 'InProgress', label: 'In Progress' },
            { value: 'Done', label: 'Done' },
          ]}
        />

        <Select
          id="task-priority"
          label="Priority"
          value={priority}
          onChange={(event) =>
            setPriority(
              event.target.value as CreateTask['priority'],
            )
          }
          options={[
            { value: 'Low', label: 'Low' },
            { value: 'Medium', label: 'Medium' },
            { value: 'High', label: 'High' },
          ]}
        />
      </div>

      <Input
        id="task-due-date"
        label="Due date"
        type="datetime-local"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      {(validationError || error) && (
        <div className="form-error" role="alert">
          {validationError || error}
        </div>
      )}

      <div className="modal-actions">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" loading={loading}>
          {task ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}