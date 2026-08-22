//imports--------------------------------
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";
//component-------------------------------
function AdminSidebar() {
    //body--------------------------------
    return (
        <aside className="admin-sidebar">

            {/* Brand-------------------------------------- */}

            <div className="admin-sidebar-brand">

                <div className="admin-sidebar-logo">

                    <svg
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <rect
                            x="3"
                            y="3"
                            width="42"
                            height="42"
                            rx="13"
                            className="sidebar-logo-frame"
                        />

                        <rect
                            x="12"
                            y="27"
                            width="5"
                            height="9"
                            rx="2"
                            className="sidebar-logo-bar sidebar-logo-bar-one"
                        />

                        <rect
                            x="21.5"
                            y="21"
                            width="5"
                            height="15"
                            rx="2"
                            className="sidebar-logo-bar sidebar-logo-bar-two"
                        />

                        <rect
                            x="31"
                            y="14"
                            width="5"
                            height="22"
                            rx="2"
                            className="sidebar-logo-bar sidebar-logo-bar-three"
                        />

                        <path
                            d="M10 23L17 18L23 20L30 13L38 10"
                            className="sidebar-logo-chart"
                        />

                        <circle
                            cx="38"
                            cy="10"
                            r="2.5"
                            className="sidebar-logo-dot"
                        />
                    </svg>

                </div>

                <div className="admin-sidebar-brand-text">

                    <strong>
                        HR<span>Dashboard</span>
                    </strong>

                    <small>
                        Admin Workspace
                    </small>

                </div>

            </div>


            {/* Navigation------------------------------------*/}

            <nav
                className="admin-sidebar-navigation"
                aria-label="Admin navigation"
            >

                {/* Overview---------------------------------------- */}

                <div className="admin-sidebar-section">

                    <span className="admin-sidebar-section-title">
                        Overview
                    </span>

                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `admin-sidebar-link ${isActive ? "active" : ""
                            }`
                        }
                    >

                        <span className="admin-sidebar-icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect
                                    x="4"
                                    y="4"
                                    width="6"
                                    height="6"
                                    rx="1"
                                />

                                <rect
                                    x="14"
                                    y="4"
                                    width="6"
                                    height="6"
                                    rx="1"
                                />

                                <rect
                                    x="4"
                                    y="14"
                                    width="6"
                                    height="6"
                                    rx="1"
                                />

                                <rect
                                    x="14"
                                    y="14"
                                    width="6"
                                    height="6"
                                    rx="1"
                                />
                            </svg>

                        </span>

                        <span className="admin-sidebar-link-label">
                            Dashboard
                        </span>

                    </NavLink>

                </div>


                {/* Management----------------------------------- */}

                <div className="admin-sidebar-section">

                    <span className="admin-sidebar-section-title">
                        Management
                    </span>

                    <NavLink
                        to="/admin/projects"
                        className={({ isActive }) =>
                            `admin-sidebar-link ${isActive ? "active" : ""
                            }`
                        }
                    >

                        <span className="admin-sidebar-icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect
                                    x="4"
                                    y="5"
                                    width="16"
                                    height="14"
                                    rx="2"
                                />

                                <path
                                    d="M8 9H16"
                                />

                                <path
                                    d="M8 13H13"
                                />

                                <path
                                    d="M8 16H11"
                                />
                            </svg>

                        </span>

                        <span className="admin-sidebar-link-label">
                            Projects
                        </span>

                    </NavLink>

                </div>

            </nav>


            {/* Bottom----------------------------- */}

            <div className="admin-sidebar-bottom">

                <div className="admin-sidebar-bottom-divider" />

                <NavLink
                    to="/"
                    className="admin-sidebar-link admin-sidebar-external"
                >

                    <span className="admin-sidebar-icon">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M14 5H19V10"
                            />

                            <path
                                d="M19 5L11 13"
                            />

                            <path
                                d="M18 13V18C18 19.1 17.1 20 16 20H6C4.9 20 4 19.1 4 18V8C4 6.9 4.9 6 6 6H11"
                            />
                        </svg>

                    </span>

                    <span className="admin-sidebar-link-label">
                        View Website
                    </span>

                    <svg
                        className="admin-sidebar-external-arrow"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path
                            d="M7 10H13"
                        />

                        <path
                            d="M10 7L13 10L10 13"
                        />
                    </svg>

                </NavLink>


                <button
                    type="button"
                    className="admin-sidebar-logout"
                >

                    <span className="admin-sidebar-icon">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M10 5H6C4.9 5 4 5.9 4 7V17C4 18.1 4.9 19 6 19H10"
                            />

                            <path
                                d="M14 8L18 12L14 16"
                            />

                            <path
                                d="M18 12H9"
                            />
                        </svg>

                    </span>

                    <span className="admin-sidebar-link-label">
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );
}

export default AdminSidebar;