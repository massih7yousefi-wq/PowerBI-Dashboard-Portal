import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="public-footer">

            <div className="footer-background">
                <div className="footer-glow footer-glow-one" />
                <div className="footer-glow footer-glow-two" />
                <div className="footer-grid" />
            </div>

            <div className="footer-container">

                <div className="footer-cta">

                    <div className="footer-cta-content">

                        <div className="footer-cta-badge">
                            <span />
                            Business Intelligence
                        </div>

                        <h2>
                            Turn Your Data Into
                            <span> Better Decisions.</span>
                        </h2>

                        <p>
                            Explore powerful dashboards and transform
                            complex business data into actionable insights.
                        </p>

                    </div>

                    <Link
                        to="/projects"
                        className="footer-cta-button"
                    >
                        Explore Dashboards

                        <svg
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path
                                d="M4 10H15M10 5L15 10L10 15"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>

                </div>

                <div className="footer-main">

                    <div className="footer-brand">

                        <Link
                            to="/"
                            className="footer-logo"
                        >

                            <div className="footer-logo-mark">

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
                                        className="footer-logo-frame"
                                    />

                                    <rect
                                        x="12"
                                        y="27"
                                        width="5"
                                        height="9"
                                        rx="2"
                                        className="footer-logo-bar footer-logo-bar-one"
                                    />

                                    <rect
                                        x="21.5"
                                        y="21"
                                        width="5"
                                        height="15"
                                        rx="2"
                                        className="footer-logo-bar footer-logo-bar-two"
                                    />

                                    <rect
                                        x="31"
                                        y="14"
                                        width="5"
                                        height="22"
                                        rx="2"
                                        className="footer-logo-bar footer-logo-bar-three"
                                    />

                                    <path
                                        d="M10 23L17 18L23 20L30 13L38 10"
                                        className="footer-logo-chart"
                                    />

                                    <circle
                                        cx="38"
                                        cy="10"
                                        r="2.5"
                                        className="footer-logo-dot"
                                    />
                                </svg>

                            </div>

                            <div className="footer-logo-content">

                                <span className="footer-logo-name">
                                    HR<span>Dashboard</span>
                                </span>

                                <small>
                                    Business Intelligence
                                </small>

                            </div>

                        </Link>

                        <p className="footer-description">
                            Turning complex data into clear insights,
                            intelligent decisions, and measurable results.
                        </p>

                        <div className="footer-socials">

                            <a
                                href="#linkedin"
                                aria-label="LinkedIn"
                                className="footer-social"
                            >
                                <span>in</span>
                            </a>

                            <a
                                href="#github"
                                aria-label="GitHub"
                                className="footer-social"
                            >
                                <span>GH</span>
                            </a>

                            <a
                                href="mailto:contact@hrdashboard.com"
                                aria-label="Email"
                                className="footer-social"
                            >
                                <span>@</span>
                            </a>

                        </div>

                    </div>

                    <div className="footer-column">

                        <h3>Platform</h3>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/projects">
                            Projects
                        </Link>

                        <a href="#dashboards">
                            Dashboards
                        </a>

                        <a href="#analytics">
                            Analytics
                        </a>

                    </div>

                    <div className="footer-column">

                        <h3>Company</h3>

                        <a href="#about">
                            About
                        </a>

                        <a href="#services">
                            Services
                        </a>

                        <a href="#contact">
                            Contact
                        </a>

                    </div>

                    <div className="footer-column footer-contact">

                        <h3>Let's Connect</h3>

                        <p>
                            Have a project or dashboard
                            in mind?
                        </p>

                        <a
                            href="mailto:contact@hrdashboard.com"
                            className="footer-contact-link"
                        >
                            contact@hrdashboard.com

                            <svg
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4 10H15M10 5L15 10L10 15"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </a>

                    </div>

                </div>

                <div className="footer-divider" />

                <div className="footer-bottom">

                    <div className="footer-copyright">

                        <span className="footer-status-dot" />

                        <p>
                            � {currentYear} HRDashboard.
                            All rights reserved.
                        </p>

                    </div>

                    <div className="footer-legal">

                        <a href="#privacy">
                            Privacy Policy
                        </a>

                        <a href="#terms">
                            Terms of Service
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;