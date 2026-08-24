// imports --------------------------------
import { Link } from "react-router-dom";
import "./Hero.css";

// component ------------------------------
function Hero() {
    return (
        <section className="hero">

            {/* Background */}
            <div className="hero-bg">
                <div className="hero-glow hero-glow-left" />
                <div className="hero-glow hero-glow-right" />
                <div className="hero-grid" />
            </div>


            {/* Main Container */}
            <div className="hero-container">

                {/* =========================
                    CONTENT
                ========================= */}

                <div className="hero-content">

                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        Business Intelligence Platform
                    </div>


                    <h1 className="hero-title">
                        Turn Data Into
                        <span>Better Decisions.</span>
                    </h1>


                    <p className="hero-description">
                        Explore interactive business intelligence dashboards
                        designed to transform complex data into clear,
                        actionable insights.
                    </p>


                    <div className="hero-actions">

                        <Link
                            to="/projects"
                            className="hero-btn hero-btn-primary"
                        >
                            Explore Dashboards
                            <span>→</span>
                        </Link>

                        <a
                            href="#about"
                            className="hero-btn hero-btn-secondary"
                        >
                            Learn More
                        </a>

                    </div>


                    <div className="hero-stats">

                        <div className="hero-stat">
                            <strong>01</strong>
                            <span>Data Driven</span>
                        </div>

                        <div className="hero-stat-line" />

                        <div className="hero-stat">
                            <strong>24/7</strong>
                            <span>Insights</span>
                        </div>

                        <div className="hero-stat-line" />

                        <div className="hero-stat">
                            <strong>100%</strong>
                            <span>Interactive</span>
                        </div>

                    </div>

                </div>


                {/* =========================
                    VISUAL
                ========================= */}

                <div className="hero-visual">

                    <div className="dashboard">

                        {/* Browser Header */}
                        <div className="dashboard-top">

                            <div className="dashboard-dots">
                                <i />
                                <i />
                                <i />
                            </div>

                            <span>HRDashboard</span>

                        </div>


                        {/* Dashboard Body */}
                        <div className="dashboard-body">

                            <div className="dashboard-heading">

                                <div>
                                    <small>OVERVIEW</small>
                                    <h3>Business Performance</h3>
                                </div>

                                <span className="dashboard-date">
                                    Last 30 Days
                                </span>

                            </div>


                            {/* Metrics */}
                            <div className="dashboard-metrics">

                                <div className="metric">
                                    <span>Total Revenue</span>
                                    <strong>$128.4K</strong>
                                    <small>+18.4%</small>
                                </div>

                                <div className="metric">
                                    <span>Growth Rate</span>
                                    <strong>24.8%</strong>
                                    <small>+6.2%</small>
                                </div>

                                <div className="metric">
                                    <span>Performance</span>
                                    <strong>92.6%</strong>
                                    <small>+12.8%</small>
                                </div>

                            </div>


                            {/* Chart */}
                            <div className="dashboard-chart">

                                <div className="chart-top">
                                    <span>Performance Overview</span>
                                    <span>2026</span>
                                </div>

                                <div className="chart">

                                    <div className="chart-grid" />

                                    <svg
                                        className="chart-svg"
                                        viewBox="0 0 600 180"
                                        preserveAspectRatio="none"
                                    >
                                        <defs>

                                            <linearGradient
                                                id="heroChartGradient"
                                                x1="0"
                                                x2="1"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#6366f1"
                                                />

                                                <stop
                                                    offset="50%"
                                                    stopColor="#a78bfa"
                                                />

                                                <stop
                                                    offset="100%"
                                                    stopColor="#8b5cf6"
                                                />
                                            </linearGradient>

                                        </defs>

                                        <path
                                            className="chart-area-fill"
                                            d="
                                                M0 145
                                                L70 130
                                                L130 138
                                                L190 100
                                                L250 112
                                                L310 72
                                                L370 90
                                                L430 52
                                                L490 65
                                                L550 28
                                                L600 40
                                                L600 180
                                                L0 180
                                                Z
                                            "
                                        />

                                        <polyline
                                            className="chart-line"
                                            points="
                                                0,145
                                                70,130
                                                130,138
                                                190,100
                                                250,112
                                                310,72
                                                370,90
                                                430,52
                                                490,65
                                                550,28
                                                600,40
                                            "
                                        />

                                    </svg>


                                    <span className="chart-dot dot-1" />
                                    <span className="chart-dot dot-2" />
                                    <span className="chart-dot dot-3" />
                                    <span className="chart-dot dot-4" />
                                    <span className="chart-dot dot-5" />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Floating Card */}
                    <div className="floating-card floating-card-top">

                        <span>Analytics</span>

                        <strong>+32.8%</strong>

                        <small>Performance</small>

                    </div>


                    <div className="floating-card floating-card-bottom">

                        <div className="floating-icon">
                            ↗
                        </div>

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