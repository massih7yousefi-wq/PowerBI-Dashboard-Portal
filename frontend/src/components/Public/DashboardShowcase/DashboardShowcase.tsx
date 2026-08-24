import "./DashboardShowcase.css";

function DashboardShowcase() {
    return (
        <section className="dashboard-showcase">

            <div className="dashboard-showcase-container">

                {/* Header */}
                <div className="dashboard-showcase-heading">

                    <div>
                        <span className="dashboard-showcase-eyebrow">
                            DASHBOARD EXPERIENCE
                        </span>

                        <h2>
                            See Your Business
                            <span> From Every Angle.</span>
                        </h2>
                    </div>

                    <p>
                        Interactive dashboards designed to make complex
                        business and workforce data easier to understand,
                        explore, and act on.
                    </p>

                </div>


                {/* Dashboard Preview */}
                <div className="dashboard-preview">

                    {/* Browser Header */}
                    <div className="dashboard-browser-bar">

                        <div className="dashboard-browser-dots">
                            <span />
                            <span />
                            <span />
                        </div>

                        <div className="dashboard-browser-title">
                            HRDashboard / Workforce Analytics
                        </div>

                    </div>


                    {/* Dashboard Content */}
                    <div className="dashboard-content">

                        {/* Sidebar */}
                        <aside className="dashboard-sidebar">

                            <div className="dashboard-sidebar-logo">
                                HR<span>Dashboard</span>
                            </div>

                            <div className="dashboard-nav">

                                <span className="active">
                                    Overview
                                </span>

                                <span>
                                    Workforce
                                </span>

                                <span>
                                    Performance
                                </span>

                                <span>
                                    Trends
                                </span>

                            </div>

                        </aside>


                        {/* Main */}
                        <div className="dashboard-main">

                            <div className="dashboard-main-header">

                                <div>
                                    <span>
                                        WORKFORCE ANALYTICS
                                    </span>

                                    <h3>
                                        Workforce Overview
                                    </h3>
                                </div>

                                <button type="button">
                                    This Year
                                    <span>⌄</span>
                                </button>

                            </div>


                            {/* Metrics */}
                            <div className="dashboard-metrics">

                                <div className="dashboard-metric">
                                    <span>
                                        TOTAL EMPLOYEES
                                    </span>

                                    <strong>
                                        2,847
                                    </strong>

                                    <small>
                                        +8.4% this year
                                    </small>
                                </div>

                                <div className="dashboard-metric">
                                    <span>
                                        RETENTION RATE
                                    </span>

                                    <strong>
                                        94.2%
                                    </strong>

                                    <small>
                                        +2.1% this year
                                    </small>
                                </div>

                                <div className="dashboard-metric">
                                    <span>
                                        ENGAGEMENT
                                    </span>

                                    <strong>
                                        87.6%
                                    </strong>

                                    <small>
                                        +4.8% this year
                                    </small>
                                </div>

                            </div>


                            {/* Charts */}
                            <div className="dashboard-charts">

                                <div className="dashboard-chart large">

                                    <div className="dashboard-chart-header">
                                        <span>
                                            Workforce Growth
                                        </span>

                                        <span>
                                            2026
                                        </span>
                                    </div>

                                    <div className="dashboard-chart-area">

                                        <div className="chart-axis">
                                            <span>3K</span>
                                            <span>2K</span>
                                            <span>1K</span>
                                            <span>0</span>
                                        </div>

                                        <div className="chart-bars">

                                            <i style={{ height: "42%" }} />
                                            <i style={{ height: "55%" }} />
                                            <i style={{ height: "48%" }} />
                                            <i style={{ height: "68%" }} />
                                            <i style={{ height: "61%" }} />
                                            <i style={{ height: "77%" }} />
                                            <i style={{ height: "88%" }} />
                                            <i style={{ height: "96%" }} />

                                        </div>

                                    </div>

                                </div>


                                <div className="dashboard-chart small">

                                    <div className="dashboard-chart-header">
                                        <span>
                                            Distribution
                                        </span>
                                    </div>

                                    <div className="dashboard-donut">

                                        <div>
                                            68%
                                        </div>

                                    </div>

                                    <div className="dashboard-legend">
                                        <span>
                                            <i />
                                            Active
                                        </span>

                                        <span>
                                            <i />
                                            Other
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Footer */}
                <div className="dashboard-showcase-footer">

                    <span>
                        POWERED BY DATA
                    </span>

                    <p>
                        Designed for clarity. Built for better decisions.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default DashboardShowcase;