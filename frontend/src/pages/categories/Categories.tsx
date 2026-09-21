import { useCallback, useEffect, useState } from 'react';

import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { Modal } from '../../components/common/Modal';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchInput } from '../../components/common/SearchInput';
import { CategoryForm } from '../../components/categories/CategoryForm';

import * as categoryService from '../../services/categoryService';

import type {
  CategoryResponse,
  CreateCategory,
} from '../../types/category';

import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/date';
import { getApiErrorMessage } from '../../utils/apiError';

export function Categories() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  const [categories, setCategories] = useState<
    CategoryResponse[]
  >([]);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryResponse | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [deleteTarget, setDeleteTarget] =
    useState<CategoryResponse | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      setCategories(await categoryService.getCategories());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const filteredCategories = categories.filter((category) => {
    const query = search.toLowerCase().trim();

    return (
      !query ||
      category.name.toLowerCase().includes(query) ||
      category.description?.toLowerCase().includes(query)
    );
  });

  const handleSubmit = async (data: CreateCategory) => {
    try {
      setFormLoading(true);
      setFormError('');

      if (editingCategory) {
        await categoryService.updateCategory(
          editingCategory.id,
          data,
        );
      } else {
        await categoryService.createCategory(data);
      }

      setFormOpen(false);
      await loadCategories();
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

      await categoryService.deleteCategory(deleteTarget.id);

      setDeleteTarget(null);
      await loadCategories();
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
        onRetry={loadCategories}
      />
    );
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Categories"
        description="Organize dashboards and business intelligence content."
        actions={
          isAdmin ? (
            <Button
              onClick={() => {
                setEditingCategory(null);
                setFormError('');
                setFormOpen(true);
              }}
            >
              + New Category
            </Button>
          ) : undefined
        }
      />

      <div className="toolbar">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search categories..."
        />
      </div>

      {filteredCategories.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="No categories match your search."
        />
      ) : (
        <div className="category-grid">
          {filteredCategories.map((category) => (
            <Card key={category.id}>
              <div className="category-card">
                <div className="category-icon">◈</div>

                <div className="category-content">
                  <h2>{category.name}</h2>

                  <p>
                    {category.description ||
                      'No description available.'}
                  </p>

                  <span>
                    Created {formatDate(category.createdAt)}
                  </span>
                </div>

                {isAdmin && (
                  <div className="category-actions">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setEditingCategory(category);
                        setFormError('');
                        setFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => setDeleteTarget(category)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={formOpen}
        title={
          editingCategory
            ? 'Edit Category'
            : 'Create Category'
        }
        onClose={() => setFormOpen(false)}
      >
        <CategoryForm
          category={editingCategory}
          loading={formLoading}
          error={formError}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete category"
        message={`Delete "${deleteTarget?.name ?? ''}"? Categories assigned to projects cannot be deleted.`}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}