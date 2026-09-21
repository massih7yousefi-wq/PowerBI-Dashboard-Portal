import type { ActivityResponse } from './activity';
import type { InsightResponse } from './insight';
import type { TaskResponse } from './task';

export interface DashboardSummary {
  totalProjects: number;
  totalMetrics: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalInsights: number;
  recentActivities: ActivityResponse[];
  recentInsights: InsightResponse[];
  upcomingTasks: TaskResponse[];
}