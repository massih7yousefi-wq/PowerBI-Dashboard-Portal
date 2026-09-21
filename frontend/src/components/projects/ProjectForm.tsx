import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';

import type { CategoryResponse } from '../../types/category';
import type {
  CreateProject,
  ProjectResponse,
} from '../../types/project';

interface ProjectFormProps {
  project?: ProjectResponse | null;
  categories: CategoryResponse[];
  loading?: boolean;
  error?: string;
  onSubmit: (data: CreateProject) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({
  project,
  categories,
  loading = false,
  error = '',
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setName(project?.name ?? '');
    setDescription(project?.description ?? '');
    setEmbedUrl(project?.embedUrl ?? '');
    setCategoryId(project?.categoryId ?? '');
  }, [project]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Project name is required.');
      return;
    }

    if (!embedUrl.trim()) {
      setValidationError('Embed URL is required.');
      return;
    }

    try {
      const url = new URL(embedUrl);

      if (url.protocol !== 'https:') {
        setValidationError('Embed URL must use HTTPS.');
        return;
      }
    } catch {
      setValidationError('Please enter a valid URL.');
      return;
    }

    await onSubmit({
      name: name.trim(),
      description: description.trim() || null,
      embedUrl: embedUrl.trim(),
      categoryId: categoryId || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-stack">
      <Input
        id="project-name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={200}
        required
      />

      <Textarea
        id="project-description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        maxLength={2000}
        rows={4}
      />

      <Input
        id="project-embed-url"
        label="Embed URL"
        type="url"
        value={embedUrl}
        onChange={(event) => setEmbedUrl(event.target.value)}
        placeholder="https://..."
        required
      />

      <Select
        id="project-category"
        label="Category"
        value={categoryId}
        onChange={(event) => setCategoryId(event.target.value)}
        options={[
          { value: '', label: 'No category' },
          ...categories.map((category) => ({
            value: category.id,
            label: category.name,
          })),
        ]}
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
          {project ? 'Save Changes' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}