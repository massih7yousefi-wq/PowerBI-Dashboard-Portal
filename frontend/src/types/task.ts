export type BiTaskStatus = 'Todo' | 'InProgress' | 'Done';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface TaskResponse {
  id: string;
  title: string;
  description: string | null;
  status: BiTaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTask {
  title: string;
  description: string | null;
  status: BiTaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
}

export type UpdateTask = CreateTask;