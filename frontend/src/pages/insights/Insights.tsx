import { useCallback, useEffect, useMemo, useState } from 'react';

import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { Modal } from '../../components/common/Modal';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchInput } from '../../components/common/SearchInput';
import { Table } from '../../components/common/Table';
import { InsightForm } from '../../components/insights/InsightForm';

import * as insightService from '../../services/insightService';
import type {
  CreateInsight,
  InsightResponse,
} from '../../types/insight';

import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/date';
import { getApiErrorMessage } from '../../utils/apiError';

export function Insights() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  const [insights, setInsights] = useState<InsightResponse[]>([]);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingInsight, setEditingInsight] =
    useState<InsightResponse | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [deleteTarget, setDeleteTarget] =
    useState<InsightResponse | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadInsights = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      setInsights(await insightService.getInsights());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInsights();
  }, [loadInsights]);

  const filteredInsights = useMemo(() => {
    const query = search.toLowerCase().trim();

    return insights.filter(
      (insight) =>
        !query ||
        insight.title.toLowerCase().includes(query) ||
        insight.description?.toLowerCase().includes(query),
    );
  }, [insights, search]);

  const severityVariant = (
    severity: InsightResponse['severity'],
  ) => {
    if (severity === 'Critical') return 'danger' as const;
    if (severity === 'Warning') return 'warning' as const;
    return 'info' as const;
  };

  const typeVariant = (type: InsightResponse['type']) => {
    if (type === 'Positive') return 'success' as const;
    if (type === 'Negative') return 'danger' as const;
    if (type === 'Warning') return 'warning' as const;
    return 'default' as const;
  };

  const handleSubmit = async (data: CreateInsight) => {
    try {
      setFormLoading(true);
      setFormError('');

      if (editingInsight) {
        await insightService.updateInsight(
          editingInsight.id,
          data,
        );
      } else {
        await insightService.createInsight(data);
      }

      setFormOpen(false);
      await loadInsights();
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleteLoading(true);

      await insightService.deleteInsight(deleteTarget.id);

      setDeleteTarget(null);
      await loadInsights();
    } catch (err) {
      setError(getApiErrorMessage(err));
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadInsights}
      />
    );
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Insights"
        description="Capture and communicate business intelligence findings."
        actions={
          isAdmin ? (
            <Button
              onClick={() => {
                setEditingInsight(null);
                setFormError('');
                setFormOpen(true);
              }}
            >
              + New Insight
            </Button>
          ) : undefined
        }
      />

      <div className="toolbar">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search insights..."
        />
      </div>

      {filteredInsights.length === 0 ? (
        <EmptyState
          title="No insights found"
          description="There are no insights matching your search."
        />
      ) : (
        <Table
          data={filteredInsights}
          rowKey={(insight) => insight.id}
          columns={[
            {
              key: 'title',
              header: 'Insight',
              render: (insight) => (
                <div className="table-primary">
                  <strong>{insight.title}</strong>
                  <span>
                    {insight.description || 'No description'}
                  </span>
                </div>
              ),
            },
            {
              key: 'type',
              header: 'Type',
              render: (insight) => (
                <Badge variant={typeVariant(insight.type)}>
                  {insight.type}
                </Badge>
              ),
            },
            {
              key: 'severity',
              header: 'Severity',
              render: (insight) => (
                <Badge
                  variant={severityVariant(insight.severity)}
                >
                  {insight.severity}
                </Badge>
              ),
            },
            {
              key: 'created',
              header: 'Created',
              render: (insight) =>
                formatDate(insight.createdAt),
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (insight) =>
                isAdmin ? (
                  <div className="table-actions">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setEditingInsight(insight);
                        setFormError('');
                        setFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => setDeleteTarget(insight)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <span className="muted-text">Read only</span>
                ),
            },
          ]}
        />
      )}

      <Modal
        open={formOpen}
        title={
          editingInsight ? 'Edit Insight' : 'Create Insight'
        }
        onClose={() => setFormOpen(false)}
      >
        <InsightForm
          insight={editingInsight}
          loading={formLoading}
          error={formError}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete insight"
        message={`Delete "${deleteTarget?.title ?? ''}"?`}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}