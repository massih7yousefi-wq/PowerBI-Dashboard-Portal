import { api } from './api';
import type {
  CreateTask,
  TaskResponse,
  UpdateTask,
} from '../types/task';

export async function getTasks(): Promise<TaskResponse[]> {
  const response = await api.get<TaskResponse[]>('/tasks');
  return response.data;
}

export async function getTask(id: string): Promise<TaskResponse> {
  const response = await api.get<TaskResponse>(`/tasks/${id}`);
  return response.data;
}

export async function createTask(data: CreateTask): Promise<TaskResponse> {
  const response = await api.post<TaskResponse>('/tasks', data);
  return response.data;
}

export async function updateTask(
  id: string,
  data: UpdateTask,
): Promise<TaskResponse> {
  const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
  return response.data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}