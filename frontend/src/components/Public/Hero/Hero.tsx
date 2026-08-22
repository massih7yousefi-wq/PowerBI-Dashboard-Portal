//imports-------------------------------
import { Link } from "react-router-dom";
import "./Hero.css";
//component----------------------------------
function Hero() {
    //body--------------------------------
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-glow hero-glow-one" />
                <div className="hero-glow hero-glow-two" />
                <div className="hero-grid" />
            </div>

            <div className="hero-container">

                <div className="hero-content">

                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        Business Intelligence Platform
                    </div>

                    <h1 className="hero-title">
                        Turn Data Into
                        <span> Better Decisions.</span>
                    </h1>

                    <p className="hero-description">
                        Explore interactive business intelligence dashboards
                        designed to transform complex data into clear,
                        actionable insights.
                    </p>

                    <div className="hero-actions">
                        <Link
                            to="/projects"
                            className="hero-primary-button"
                        >
                            Explore Dashboards
                            <span>→</span>
                        </Link>

                        <a
                            href="#about"
                            className="hero-secondary-button"
                        >
                            Learn More
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <strong>01</strong>
                            <span>Data Driven</span>
                        </div>

                        <div className="hero-stat-divider" />

                        <div className="hero-stat">
                            <strong>24/7</strong>
                            <span>Insights</span>
                        </div>

                        <div className="hero-stat-divider" />

                        <div className="hero-stat">
                            <strong>100%</strong>
                            <span>Interactive</span>
                        </div>
                    </div>

                </div>

                <div className="hero-visual">

                    <div className="dashboard-window">

                        <div className="dashboard-window-header">
                            <div className="dashboard-window-dots">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="dashboard-window-title">
                                HRDashboard
                            </div>
                        </div>

                        <div className="dashboard-content">

                            <div className="dashboard-heading">
                                <div>
                                    <span>Overview</span>
                                    <strong>Business Performance</strong>
                                </div>

                                <div className="dashboard-period">
                                    Last 30 Days
                                </div>
                            </div>

                            <div className="dashboard-metrics">

                                <div className="dashboard-card">
                                    <span>Total Revenue</span>
                                    <strong>$128.4K</strong>
                                    <small>+18.4%</small>
                                </div>

                                <div className="dashboard-card">
                                    <span>Growth Rate</span>
                                    <strong>24.8%</strong>
                                    <small>+6.2%</small>
                                </div>

                                <div className="dashboard-card">
                                    <span>Performance</span>
                                    <strong>92.6%</strong>
                                    <small>+12.8%</small>
                                </div>

                            </div>

                            <div className="dashboard-chart">

                                <div className="chart-header">
                                    <span>Performance Overview</span>
                                    <span>2026</span>
                                </div>

                                <div className="chart-area">
                                    <div className="chart-line chart-line-one" />
                                    <div className="chart-line chart-line-two" />

                                    <div className="chart-point point-one" />
                                    <div className="chart-point point-two" />
                                    <div className="chart-point point-three" />
                                    <div className="chart-point point-four" />
                                    <div className="chart-point point-five" />
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="hero-floating-card hero-floating-card-one">
                        <span className="floating-label">
                            Analytics
                        </span>

                        <strong>
                            +32.8%
                        </strong>

                        <small>
                            Performance
                        </small>
                    </div>

                    <div className="hero-floating-card hero-floating-card-two">
                        <span className="floating-icon">
                            ↗
                        </span>

                        <div>
                            <strong>Real-time</strong>
                            <small>Insights</small>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;