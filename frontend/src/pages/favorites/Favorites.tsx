import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { PageHeader } from '../../components/common/PageHeader';

import * as favoriteService from '../../services/favoriteService';

import type { FavoriteResponse } from '../../types/favorite';

import { formatDate } from '../../utils/date';
import { getApiErrorMessage } from '../../utils/apiError';

export function Favorites() {
  const [favorites, setFavorites] = useState<
    FavoriteResponse[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      setFavorites(await favoriteService.getFavorites());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFavorites();
  }, [loadFavorites]);

  const removeFavorite = async (projectId: string) => {
    try {
      await favoriteService.removeFavorite(projectId);

      setFavorites((current) =>
        current.filter(
          (favorite) => favorite.projectId !== projectId,
        ),
      );
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadFavorites}
      />
    );
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Favorites"
        description="Your saved dashboard projects."
      />

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Save projects you frequently use to access them quickly."
        />
      ) : (
        <div className="favorite-grid">
          {favorites.map((favorite) => (
            <Card key={favorite.id}>
              <div className="favorite-card">
                <div className="favorite-star">★</div>

                <div>
                  <h2>{favorite.projectName}</h2>
                  <p>
                    Saved {formatDate(favorite.createdAt)}
                  </p>
                </div>

                <div className="favorite-actions">
                  <Link
                    to={`/projects/${favorite.projectId}`}
                    className="button button-secondary"
                  >
                    Open
                  </Link>

                  <Button
                    variant="ghost"
                    onClick={() =>
                      removeFavorite(favorite.projectId)
                    }
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}