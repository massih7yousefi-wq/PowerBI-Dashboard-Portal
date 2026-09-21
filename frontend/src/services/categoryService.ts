import { api } from './api';
import type {
  CategoryResponse,
  CreateCategory,
  UpdateCategory,
} from '../types/category';

export async function getCategories(): Promise<CategoryResponse[]> {
  const response = await api.get<CategoryResponse[]>('/categories');
  return response.data;
}

export async function getCategory(id: string): Promise<CategoryResponse> {
  const response = await api.get<CategoryResponse>(`/categories/${id}`);
  return response.data;
}

export async function createCategory(
  data: CreateCategory,
): Promise<CategoryResponse> {
  const response = await api.post<CategoryResponse>('/categories', data);
  return response.data;
}

export async function updateCategory(
  id: string,
  data: UpdateCategory,
): Promise<CategoryResponse> {
  const response = await api.put<CategoryResponse>(
    `/categories/${id}`,
    data,
  );
  return response.data;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}