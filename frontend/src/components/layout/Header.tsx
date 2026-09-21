import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
}

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/metrics': 'Metrics',
  '/insights': 'Insights',
  '/categories': 'Categories',
  '/favorites': 'Favorites',
  '/activities': 'Activities',
};

export function Header({
  onMenuClick,
}: HeaderProps) {
  const location = useLocation();
  const { user } = useAuth();

  const exactTitle =
    titles[location.pathname];

  const title =
    exactTitle ??
    (location.pathname.startsWith('/projects/')
      ? 'Project Details'
      : 'HRDashboard');

  const avatarLetter =
    user?.email?.charAt(0).toUpperCase() ?? 'U';

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div className="header-title">
          <span className="header-breadcrumb">
            HRDASHBOARD / WORKSPACE
          </span>

          <h2>{title}</h2>
        </div>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="header-icon-button"
          aria-label="Search"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="6"
            />
            <path d="M16 16l5 5" />
          </svg>
        </button>

        <button
          type="button"
          className="header-icon-button notification-button"
          aria-label="Notifications"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>

          <span className="notification-dot" />
        </button>

        <div className="header-divider" />

        <div className="header-user">
          <div className="avatar avatar-small">
            {avatarLetter}
          </div>

          <div className="header-user-info">
            <strong>
              {user?.email ?? 'User'}
            </strong>

            <span>
              {user?.role ?? 'Member'}
            </span>
          </div>

          <span
            className="header-user-chevron"
            aria-hidden="true"
          >
            ⌄
          </span>
        </div>
      </div>
    </header>
  );
}