import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';

import type {
  CategoryResponse,
  CreateCategory,
} from '../../types/category';

interface CategoryFormProps {
  category?: CategoryResponse | null;
  loading?: boolean;
  error?: string;
  onSubmit: (data: CreateCategory) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({
  category,
  loading = false,
  error = '',
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] =
    useState('');

  useEffect(() => {
    setName(category?.name ?? '');
    setDescription(category?.description ?? '');
  }, [category]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Category name is required.');
      return;
    }

    await onSubmit({
      name: name.trim(),
      description: description.trim() || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-stack">
      <Input
        id="category-name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={100}
        required
      />

      <Textarea
        id="category-description"
        label="Description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        maxLength={1000}
        rows={4}
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
          {category ? 'Save Changes' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
}