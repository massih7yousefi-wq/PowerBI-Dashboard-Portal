export type InsightType = 'Positive' | 'Negative' | 'Neutral' | 'Warning';

export type InsightSeverity = 'Info' | 'Warning' | 'Critical';

export interface InsightResponse {
  id: string;
  title: string;
  description: string | null;
  type: InsightType;
  severity: InsightSeverity;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInsight {
  title: string;
  description: string | null;
  type: InsightType;
  severity: InsightSeverity;
}

export type UpdateInsight = CreateInsight;