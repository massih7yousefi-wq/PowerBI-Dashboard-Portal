//imports--------------------------------
import "./AdminHeader.css";
//component-----------------------------
function AdminHeader() {
    //body-----------------------------
    return (
        <header className="admin-header">

            {/* Left-------------------------- */}

            <div className="admin-header-left">

                <div className="admin-header-brand">

                    <div className="admin-header-logo">

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
                                className="admin-logo-frame"
                            />

                            <rect
                                x="12"
                                y="27"
                                width="5"
                                height="9"
                                rx="2"
                                className="admin-logo-bar admin-logo-bar-one"
                            />

                            <rect
                                x="21.5"
                                y="21"
                                width="5"
                                height="15"
                                rx="2"
                                className="admin-logo-bar admin-logo-bar-two"
                            />

                            <rect
                                x="31"
                                y="14"
                                width="5"
                                height="22"
                                rx="2"
                                className="admin-logo-bar admin-logo-bar-three"
                            />

                            <path
                                d="M10 23L17 18L23 20L30 13L38 10"
                                className="admin-logo-chart"
                            />

                            <circle
                                cx="38"
                                cy="10"
                                r="2.5"
                                className="admin-logo-dot"
                            />
                        </svg>

                    </div>

                    <div className="admin-header-brand-name">
                        <strong>
                            HR<span>Dashboard</span>
                        </strong>

                        <small>
                            Admin Workspace
                        </small>
                    </div>

                </div>


                <div className="admin-header-divider" />


                <div className="admin-header-page-info">

                    <div className="admin-header-breadcrumb">
                        <span>Workspace</span>

                        <span className="admin-breadcrumb-arrow">
                            /
                        </span>

                        <span className="admin-breadcrumb-current">
                            Dashboard
                        </span>
                    </div>

                    <h1>
                        Overview
                    </h1>

                </div>

            </div>


            {/* Right------------------------------ */}

            <div className="admin-header-actions">

                {/* System status------------------------ */}

                <div className="admin-system-status">

                    <span className="admin-status-dot" />

                    <span>
                        System Online
                    </span>

                </div>


                {/* Notifications--------------------------- */}

                <button
                    type="button"
                    className="admin-header-notification"
                    aria-label="Notifications"
                >

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                        />

                        <path
                            d="M10 21h4"
                        />
                    </svg>

                    <span className="admin-notification-dot" />

                </button>


                {/* Profile---------------------------- */}

                <button
                    type="button"
                    className="admin-header-profile"
                >

                    <div className="admin-header-avatar">
                        A
                    </div>

                    <div className="admin-header-user">

                        <strong>
                            Admin
                        </strong>

                        <span>
                            Administrator
                        </span>

                    </div>

                    <svg
                        className="admin-profile-arrow"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path
                            d="M6 8L10 12L14 8"
                        />
                    </svg>

                </button>

            </div>

        </header>
    );
}

export default AdminHeader;