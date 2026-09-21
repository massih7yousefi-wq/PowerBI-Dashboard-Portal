import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { Modal } from '../../components/common/Modal';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchInput } from '../../components/common/SearchInput';
import { Table } from '../../components/common/Table';
import { MetricForm } from '../../components/metrics/MetricForm';

import * as metricService from '../../services/metricService';
import type {
  CreateMetric,
  MetricResponse,
} from '../../types/metric';

import { useAuth } from '../../hooks/useAuth';
import { getApiErrorMessage } from '../../utils/apiError';

export function Metrics() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  const [metrics, setMetrics] = useState<MetricResponse[]>([]);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingMetric, setEditingMetric] =
    useState<MetricResponse | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [deleteTarget, setDeleteTarget] =
    useState<MetricResponse | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      setMetrics(await metricService.getMetrics());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMetrics();
  }, [loadMetrics]);

  const filteredMetrics = useMemo(() => {
    const query = search.toLowerCase().trim();

    return metrics.filter(
      (metric) =>
        !query ||
        metric.name.toLowerCase().includes(query) ||
        metric.category.toLowerCase().includes(query) ||
        metric.source.toLowerCase().includes(query),
    );
  }, [metrics, search]);

  const handleSubmit = async (data: CreateMetric) => {
    try {
      setFormLoading(true);
      setFormError('');

      if (editingMetric) {
        await metricService.updateMetric(
          editingMetric.id,
          data,
        );
      } else {
        await metricService.createMetric(data);
      }

      setFormOpen(false);
      await loadMetrics();
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

      await metricService.deleteMetric(deleteTarget.id);

      setDeleteTarget(null);
      await loadMetrics();
    } catch (err) {
      setError(getApiErrorMessage(err));
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  if (error) {
    return <ErrorState message={error} onRetry={loadMetrics} />;
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Metrics"
        description="Define and manage business performance metrics."
        actions={
          isAdmin ? (
            <Button
              onClick={() => {
                setEditingMetric(null);
                setFormError('');
                setFormOpen(true);
              }}
            >
              + New Metric
            </Button>
          ) : undefined
        }
      />

      <div className="toolbar">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search metrics..."
        />
      </div>

      {filteredMetrics.length === 0 ? (
        <EmptyState
          title="No metrics found"
          description="There are no metrics matching your search."
        />
      ) : (
        <Table
          data={filteredMetrics}
          rowKey={(metric) => metric.id}
          columns={[
            {
              key: 'name',
              header: 'Metric',
              render: (metric) => (
                <div className="table-primary">
                  <strong>{metric.name}</strong>
                  <span>
                    {metric.description || 'No description'}
                  </span>
                </div>
              ),
            },
            {
              key: 'category',
              header: 'Category',
              render: (metric) => metric.category,
            },
            {
              key: 'source',
              header: 'Source',
              render: (metric) => metric.source,
            },
            {
              key: 'unit',
              header: 'Unit',
              render: (metric) => metric.unit,
            },
            {
              key: 'target',
              header: 'Target',
              render: (metric) =>
                metric.targetValue === null
                  ? '—'
                  : `${metric.targetValue} ${metric.unit}`,
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (metric) =>
                isAdmin ? (
                  <div className="table-actions">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setEditingMetric(metric);
                        setFormError('');
                        setFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => setDeleteTarget(metric)}
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
        title={editingMetric ? 'Edit Metric' : 'Create Metric'}
        onClose={() => setFormOpen(false)}
        width="large"
      >
        <MetricForm
          metric={editingMetric}
          loading={formLoading}
          error={formError}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete metric"
        message={`Delete "${deleteTarget?.name ?? ''}"?`}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}