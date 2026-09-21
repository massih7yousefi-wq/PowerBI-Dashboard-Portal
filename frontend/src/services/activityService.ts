import { api } from './api';
import type { ActivityResponse } from '../types/activity';

export async function getActivities(
  count = 20,
): Promise<ActivityResponse[]> {
  const response = await api.get<ActivityResponse[]>('/activities', {
    params: { count },
  });

  return response.data;
}