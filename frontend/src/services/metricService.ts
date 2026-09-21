import { api } from './api';
import type {
  CreateMetric,
  MetricResponse,
  UpdateMetric,
} from '../types/metric';

export async function getMetrics(): Promise<MetricResponse[]> {
  const response = await api.get<MetricResponse[]>('/metrics');
  return response.data;
}

export async function getMetric(id: string): Promise<MetricResponse> {
  const response = await api.get<MetricResponse>(`/metrics/${id}`);
  return response.data;
}

export async function createMetric(
  data: CreateMetric,
): Promise<MetricResponse> {
  const response = await api.post<MetricResponse>('/metrics', data);
  return response.data;
}

export async function updateMetric(
  id: string,
  data: UpdateMetric,
): Promise<MetricResponse> {
  const response = await api.put<MetricResponse>(`/metrics/${id}`, data);
  return response.data;
}

export async function deleteMetric(id: string): Promise<void> {
  await api.delete(`/metrics/${id}`);
}