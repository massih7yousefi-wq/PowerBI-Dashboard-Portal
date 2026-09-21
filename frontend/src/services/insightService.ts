import { api } from './api';
import type {
  CreateInsight,
  InsightResponse,
  UpdateInsight,
} from '../types/insight';

export async function getInsights(): Promise<InsightResponse[]> {
  const response = await api.get<InsightResponse[]>('/insights');
  return response.data;
}

export async function getInsight(id: string): Promise<InsightResponse> {
  const response = await api.get<InsightResponse>(`/insights/${id}`);
  return response.data;
}

export async function createInsight(
  data: CreateInsight,
): Promise<InsightResponse> {
  const response = await api.post<InsightResponse>('/insights', data);
  return response.data;
}

export async function updateInsight(
  id: string,
  data: UpdateInsight,
): Promise<InsightResponse> {
  const response = await api.put<InsightResponse>(`/insights/${id}`, data);
  return response.data;
}

export async function deleteInsight(id: string): Promise<void> {
  await api.delete(`/insights/${id}`);
}