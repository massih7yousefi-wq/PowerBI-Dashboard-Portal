export interface CategoryResponse {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
}

export interface CreateCategory {
  name: string;
  description: string | null;
}

export type UpdateCategory = CreateCategory;