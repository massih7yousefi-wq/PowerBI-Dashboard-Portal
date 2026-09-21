import { useCallback, useEffect, useState } from 'react';

import { Card } from '../../components/common/Card';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { ActivityList } from '../../components/dashboard/ActivityList';
import { UpcomingTasks } from '../../components/dashboard/UpcomingTasks';

import { getDashboardSummary } from '../../services/dashboardService';
import type { DashboardSummary } from '../../types/dashboard';
import { getApiErrorMessage } from '../../utils/apiError';

export function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getDashboardSummary();
      setSummary(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !summary) {
    return (
      <>
        <PageHeader
          title="Dashboard"
          description="Overview of your analytics workspace."
        />

        <ErrorState
          message={error || 'Unable to load dashboard.'}
          onRetry={loadDashboard}
        />
      </>
    );
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Dashboard"
        description="Overview of your analytics workspace."
      />

      <div className="stats-grid">
        <StatCard
          label="Projects"
          value={summary.totalProjects}
          icon="▣"
          tone="primary"
        />

        <StatCard
          label="Metrics"
          value={summary.totalMetrics}
          icon="◫"
          tone="success"
        />

        <StatCard
          label="Tasks"
          value={summary.totalTasks}
          description={`${summary.completedTasks} completed`}
          icon="✓"
          tone="warning"
        />

        <StatCard
          label="Insights"
          value={summary.totalInsights}
          icon="✦"
          tone="danger"
        />
      </div>

      <div className="dashboard-grid">
        <Card>
          <div className="section-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest workspace changes</p>
            </div>
          </div>

          <ActivityList activities={summary.recentActivities} />
        </Card>

        <Card>
          <div className="section-heading">
            <div>
              <h2>Upcoming Tasks</h2>
              <p>Tasks that need attention</p>
            </div>
          </div>

          <UpcomingTasks tasks={summary.upcomingTasks} />
        </Card>
      </div>

      <Card>
        <div className="section-heading">
          <div>
            <h2>Recent Insights</h2>
            <p>Latest business intelligence findings</p>
          </div>
        </div>

        {summary.recentInsights.length === 0 ? (
          <p className="muted-text">No recent insights.</p>
        ) : (
          <div className="insight-dashboard-grid">
            {summary.recentInsights.map((insight) => (
              <div
                className="dashboard-insight"
                key={insight.id}
              >
                <span
                  className={`insight-indicator insight-${insight.severity.toLowerCase()}`}
                />

                <div>
                  <strong>{insight.title}</strong>
                  <p>{insight.description ?? 'No description.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}