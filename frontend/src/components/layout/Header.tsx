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

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const { user } = useAuth();

  const exactTitle = titles[location.pathname];

  const title =
    exactTitle ??
    (location.pathname.startsWith('/projects/')
      ? 'Project Details'
      : 'HRDashboard');

  return (
    <header className="top-header">
      <button
        type="button"
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        ☰
      </button>

      <div className="header-title">
        <h2>{title}</h2>
        <span>Analytics workspace</span>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="header-icon-button"
          aria-label="Notifications"
        >
          ♢
        </button>

        <div className="header-user">
          <div className="avatar avatar-small">
            {user?.email.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{user?.email}</strong>
            <span>{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}