import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';
import { Input } from '../common/Input';

import type {
  CreateInsight,
  InsightResponse,
} from '../../types/insight';

interface InsightFormProps {
  insight?: InsightResponse | null;
  loading?: boolean;
  error?: string;
  onSubmit: (data: CreateInsight) => Promise<void>;
  onCancel: () => void;
}

export function InsightForm({
  insight,
  loading = false,
  error = '',
  onSubmit,
  onCancel,
}: InsightFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] =
    useState<CreateInsight['type']>('Neutral');
  const [severity, setSeverity] =
    useState<CreateInsight['severity']>('Info');

  const [validationError, setValidationError] =
    useState('');

  useEffect(() => {
    setTitle(insight?.title ?? '');
    setDescription(insight?.description ?? '');
    setType(insight?.type ?? 'Neutral');
    setSeverity(insight?.severity ?? 'Info');
  }, [insight]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Insight title is required.');
      return;
    }

    await onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      type,
      severity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-stack">
      <Input
        id="insight-title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={200}
        required
      />

      <Textarea
        id="insight-description"
        label="Description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        maxLength={4000}
        rows={6}
      />

      <div className="form-grid">
        <Select
          id="insight-type"
          label="Type"
          value={type}
          onChange={(event) =>
            setType(event.target.value as CreateInsight['type'])
          }
          options={[
            { value: 'Positive', label: 'Positive' },
            { value: 'Negative', label: 'Negative' },
            { value: 'Neutral', label: 'Neutral' },
            { value: 'Warning', label: 'Warning' },
          ]}
        />

        <Select
          id="insight-severity"
          label="Severity"
          value={severity}
          onChange={(event) =>
            setSeverity(
              event.target.value as CreateInsight['severity'],
            )
          }
          options={[
            { value: 'Info', label: 'Info' },
            { value: 'Warning', label: 'Warning' },
            { value: 'Critical', label: 'Critical' },
          ]}
        />
      </div>

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
          {insight ? 'Save Changes' : 'Create Insight'}
        </Button>
      </div>
    </form>
  );
}