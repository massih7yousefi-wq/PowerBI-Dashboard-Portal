import { api } from './api';
import type { FavoriteResponse } from '../types/favorite';

export async function getFavorites(): Promise<FavoriteResponse[]> {
  const response = await api.get<FavoriteResponse[]>('/favorites');
  return response.data;
}

export async function addFavorite(projectId: string): Promise<FavoriteResponse> {
  const response = await api.post<FavoriteResponse>(
    `/favorites/${projectId}`,
  );
  return response.data;
}

export async function removeFavorite(projectId: string): Promise<void> {
  await api.delete(`/favorites/${projectId}`);
}