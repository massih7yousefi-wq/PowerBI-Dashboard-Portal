//imports----------------------------
import "./AdminDashboard.css";
//component--------------------------------
function AdminDashboard() {
    //body---------------------------------------
    return (
        <section className="admin-dashboard">

            {/* Welcome------------------------------*/}

            <div className="admin-dashboard-welcome">

                <div className="admin-dashboard-welcome-content">

                    <div className="admin-dashboard-welcome-logo">

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
                                className="dashboard-logo-frame"
                            />

                            <rect
                                x="12"
                                y="27"
                                width="5"
                                height="9"
                                rx="2"
                                className="dashboard-logo-bar dashboard-logo-bar-one"
                            />

                            <rect
                                x="21.5"
                                y="21"
                                width="5"
                                height="15"
                                rx="2"
                                className="dashboard-logo-bar dashboard-logo-bar-two"
                            />

                            <rect
                                x="31"
                                y="14"
                                width="5"
                                height="22"
                                rx="2"
                                className="dashboard-logo-bar dashboard-logo-bar-three"
                            />

                            <path
                                d="M10 23L17 18L23 20L30 13L38 10"
                                className="dashboard-logo-chart"
                            />

                            <circle
                                cx="38"
                                cy="10"
                                r="2.5"
                                className="dashboard-logo-dot"
                            />
                        </svg>

                    </div>

                    <div className="admin-dashboard-welcome-text">

                        <span className="admin-dashboard-eyebrow">
                            HRDashboard / Admin
                        </span>

                        <h2>
                            Welcome back, <span>Admin.</span>
                        </h2>

                        <p>
                            Manage your Power BI projects, dashboards,
                            and published insights from one workspace.
                        </p>

                    </div>

                </div>


                <div className="admin-dashboard-welcome-status">

                    <span className="welcome-status-dot" />

                    <div>
                        <strong>
                            Workspace
                        </strong>

                        <small>
                            Operational
                        </small>
                    </div>

                </div>

            </div>


            {/* Stats-------------------------- */}

            <div className="admin-dashboard-stats">

                <div className="admin-stat-card">

                    <div className="admin-stat-top">

                        <span>
                            Total Projects
                        </span>

                        <div className="admin-stat-icon">

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

                            </svg>

                        </div>

                    </div>

                    <strong>
                        12
                    </strong>

                    <div className="admin-stat-bottom">

                        <span className="stat-positive">
                            +3
                        </span>

                        <small>
                            Active projects
                        </small>

                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-top">

                        <span>
                            Dashboards
                        </span>

                        <div className="admin-stat-icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="2"
                                />

                                <path
                                    d="M8 15L11 12L14 14L18 9"
                                />

                            </svg>

                        </div>

                    </div>

                    <strong>
                        18
                    </strong>

                    <div className="admin-stat-bottom">

                        <span className="stat-positive">
                            +5
                        </span>

                        <small>
                            Power BI reports
                        </small>

                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-top">

                        <span>
                            Published
                        </span>

                        <div className="admin-stat-icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M5 12L9 16L19 6"
                                />

                                <path
                                    d="M4 20H20"
                                />

                            </svg>

                        </div>

                    </div>

                    <strong>
                        10
                    </strong>

                    <div className="admin-stat-bottom">

                        <span className="stat-positive">
                            83%
                        </span>

                        <small>
                            Public projects
                        </small>

                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-top">

                        <span>
                            Last Update
                        </span>

                        <div className="admin-stat-icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="8"
                                />

                                <path
                                    d="M12 8V12L15 14"
                                />

                            </svg>

                        </div>

                    </div>

                    <strong className="admin-stat-time">
                        Today
                    </strong>

                    <div className="admin-stat-bottom">

                        <span className="stat-online">
                            ●
                        </span>

                        <small>
                            System status
                        </small>

                    </div>

                </div>

            </div>


            {/* Dashboard Preview------------------------------------------ */}

            <div className="admin-dashboard-preview">

                <div className="admin-preview-header">

                    <div>
                        <span>
                            Analytics
                        </span>

                        <h3>
                            Platform Overview
                        </h3>
                    </div>

                    <span className="admin-preview-period">
                        Current Period
                    </span>

                </div>


                <div className="admin-preview-chart">

                    <div className="preview-grid-line line-1" />
                    <div className="preview-grid-line line-2" />
                    <div className="preview-grid-line line-3" />
                    <div className="preview-grid-line line-4" />

                    <div className="preview-chart-area">

                        <svg
                            viewBox="0 0 800 220"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <defs>

                                <linearGradient
                                    id="dashboardChartGradient"
                                    x1="0"
                                    x2="0"
                                    y1="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#8b5cf6"
                                        stopOpacity="0.25"
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#8b5cf6"
                                        stopOpacity="0"
                                    />
                                </linearGradient>

                            </defs>

                            <path
                                className="preview-chart-fill"
                                d="M0 180
                                   C80 165 90 145 160 152
                                   C230 160 250 125 320 132
                                   C390 140 410 95 480 110
                                   C550 125 570 75 640 88
                                   C700 98 740 55 800 62
                                   L800 220
                                   L0 220 Z"
                            />

                            <path
                                className="preview-chart-line"
                                d="M0 180
                                   C80 165 90 145 160 152
                                   C230 160 250 125 320 132
                                   C390 140 410 95 480 110
                                   C550 125 570 75 640 88
                                   C700 98 740 55 800 62"
                            />

                        </svg>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AdminDashboard;