import { api } from './api';
import type {
  CreateProject,
  ProjectResponse,
  UpdateProject,
} from '../types/project';

export async function getProjects(): Promise<ProjectResponse[]> {
  const response = await api.get<ProjectResponse[]>('/projects');
  return response.data;
}

export async function getProject(id: string): Promise<ProjectResponse> {
  const response = await api.get<ProjectResponse>(`/projects/${id}`);
  return response.data;
}

export async function createProject(
  data: CreateProject,
): Promise<ProjectResponse> {
  const response = await api.post<ProjectResponse>('/projects', data);
  return response.data;
}

export async function updateProject(
  id: string,
  data: UpdateProject,
): Promise<ProjectResponse> {
  const response = await api.put<ProjectResponse>(`/projects/${id}`, data);
  return response.data;
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}