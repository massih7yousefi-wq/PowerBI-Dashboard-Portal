import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';

import type {
  CreateMetric,
  MetricResponse,
} from '../../types/metric';

interface MetricFormProps {
  metric?: MetricResponse | null;
  loading?: boolean;
  error?: string;
  onSubmit: (data: CreateMetric) => Promise<void>;
  onCancel: () => void;
}

export function MetricForm({
  metric,
  loading = false,
  error = '',
  onSubmit,
  onCancel,
}: MetricFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [definition, setDefinition] = useState('');
  const [source, setSource] = useState('');
  const [unit, setUnit] = useState('');
  const [targetValue, setTargetValue] = useState('');

  const [validationError, setValidationError] =
    useState('');

  useEffect(() => {
    setName(metric?.name ?? '');
    setDescription(metric?.description ?? '');
    setCategory(metric?.category ?? '');
    setDefinition(metric?.definition ?? '');
    setSource(metric?.source ?? '');
    setUnit(metric?.unit ?? '');
    setTargetValue(
      metric?.targetValue === null ||
        metric?.targetValue === undefined
        ? ''
        : String(metric.targetValue),
    );
  }, [metric]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Metric name is required.');
      return;
    }

    if (!category.trim()) {
      setValidationError('Category is required.');
      return;
    }

    if (!definition.trim()) {
      setValidationError('Definition is required.');
      return;
    }

    if (!source.trim()) {
      setValidationError('Source is required.');
      return;
    }

    if (!unit.trim()) {
      setValidationError('Unit is required.');
      return;
    }

    const parsedTarget = targetValue.trim()
      ? Number(targetValue)
      : null;

    if (
      parsedTarget !== null &&
      (!Number.isFinite(parsedTarget) || parsedTarget < 0)
    ) {
      setValidationError('Target value must be a valid number.');
      return;
    }

    await onSubmit({
      name: name.trim(),
      description: description.trim() || null,
      category: category.trim(),
      definition: definition.trim(),
      source: source.trim(),
      unit: unit.trim(),
      targetValue: parsedTarget,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-stack">
      <Input
        id="metric-name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={200}
        required
      />

      <Textarea
        id="metric-description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        maxLength={2000}
        rows={3}
      />

      <div className="form-grid">
        <Input
          id="metric-category"
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          maxLength={100}
          required
        />

        <Input
          id="metric-unit"
          label="Unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          maxLength={100}
          placeholder="%, count, USD..."
          required
        />
      </div>

      <Input
        id="metric-source"
        label="Source"
        value={source}
        onChange={(event) => setSource(event.target.value)}
        maxLength={500}
        required
      />

      <Textarea
        id="metric-definition"
        label="Definition"
        value={definition}
        onChange={(event) => setDefinition(event.target.value)}
        maxLength={4000}
        rows={5}
        required
      />

      <Input
        id="metric-target"
        label="Target Value"
        type="number"
        value={targetValue}
        onChange={(event) => setTargetValue(event.target.value)}
        step="any"
      />

      {(validationError || error) && (
        <div className="form-error" role="alert">
          {validationError || error}
        </div>
      )}

      <div className="modal-actions">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" loading={loading}>
          {metric ? 'Save Changes' : 'Create Metric'}
        </Button>
      </div>
    </form>
  );
}