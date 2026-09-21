import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { label: 'Dashboard', path: '/dashboard', icon: '⌂' },
  { label: 'Projects', path: '/projects', icon: '▣' },
  { label: 'Tasks', path: '/tasks', icon: '✓' },
  { label: 'Metrics', path: '/metrics', icon: '◫' },
  { label: 'Insights', path: '/insights', icon: '✦' },
  { label: 'Categories', path: '/categories', icon: '◈' },
  { label: 'Favorites', path: '/favorites', icon: '★' },
  { label: 'Activities', path: '/activities', icon: '◷' },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">H</div>
          <div>
            <strong>HRDashboard</strong>
            <span>Business Intelligence</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <span className="nav-section-title">Workspace</span>

          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="avatar">
              {user?.email.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user?.email}</strong>
              <span>{user?.role}</span>
            </div>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={logout}
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}