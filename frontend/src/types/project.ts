export interface ProjectResponse {
  id: string;
  name: string;
  description: string | null;
  embedUrl: string;
  categoryId: string | null;
  categoryName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProject {
  name: string;
  description: string | null;
  embedUrl: string;
  categoryId: string | null;
}

export type UpdateProject = CreateProject;