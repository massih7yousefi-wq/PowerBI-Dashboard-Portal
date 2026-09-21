import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BrandLogo } from '../common/BrandLogo';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: '⌂',
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: '▣',
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: '✓',
  },
  {
    label: 'Metrics',
    path: '/metrics',
    icon: '◫',
  },
  {
    label: 'Insights',
    path: '/insights',
    icon: '✦',
  },
  {
    label: 'Categories',
    path: '/categories',
    icon: '◈',
  },
  {
    label: 'Favorites',
    path: '/favorites',
    icon: '★',
  },
  {
    label: 'Activities',
    path: '/activities',
    icon: '◷',
  },
];

export function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const { user, logout } = useAuth();

  const avatarLetter =
    user?.email?.charAt(0).toUpperCase() ?? 'U';

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${
          open ? 'sidebar-open' : ''
        }`}
      >
        <div className="sidebar-brand">
          <BrandLogo
            size="small"
            subtitle="Analytics Platform"
          />
        </div>

        <div className="sidebar-section">
          <span className="nav-section-title">
            WORKSPACE
          </span>

          <nav
            className="sidebar-nav"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? 'nav-link-active'
                      : ''
                  }`
                }
              >
                <span
                  className="nav-icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <span className="nav-label">
                  {item.label}
                </span>

                <span
                  className="nav-active-dot"
                  aria-hidden="true"
                />
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-spacer" />

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="avatar">
              {avatarLetter}
            </div>

            <div className="sidebar-user-info">
              <strong>
                {user?.email ?? 'User'}
              </strong>

              <span>
                {user?.role ?? 'Member'}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={logout}
          >
            <span
              className="logout-icon"
              aria-hidden="true"
            >
              ↪
            </span>

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}