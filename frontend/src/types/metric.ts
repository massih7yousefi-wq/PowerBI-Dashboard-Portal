export interface MetricResponse {
  id: string;
  name: string;
  description: string | null;
  category: string;
  definition: string;
  source: string;
  unit: string;
  targetValue: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMetric {
  name: string;
  description: string | null;
  category: string;
  definition: string;
  source: string;
  unit: string;
  targetValue: number | null;
}

export type UpdateMetric = CreateMetric;