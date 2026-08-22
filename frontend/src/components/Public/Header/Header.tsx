//imports--------------------------------------
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
//component-----------------------------------------
function Header() {
    //states------------------------------
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };
    //body--------------------------------------
    return (
        <header className="public-header">

            {/* Ambient background glow------------------ */}
            <div className="header-glow header-glow-one" />
            <div className="header-glow header-glow-two" />

            <div className="header-container">

                {/* Logo--------------------- */}
                <Link
                    to="/"
                    className="header-logo"
                    onClick={closeMenu}
                >
                    <div className="header-logo-mark">

                        <svg
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            {/* Outer frame-------------------- */}
                            <rect
                                x="3"
                                y="3"
                                width="42"
                                height="42"
                                rx="13"
                                className="logo-frame"
                            />

                            {/* Dashboard bars----------------- */}
                            <rect
                                x="12"
                                y="27"
                                width="5"
                                height="9"
                                rx="2"
                                className="logo-bar logo-bar-one"
                            />

                            <rect
                                x="21.5"
                                y="21"
                                width="5"
                                height="15"
                                rx="2"
                                className="logo-bar logo-bar-two"
                            />

                            <rect
                                x="31"
                                y="14"
                                width="5"
                                height="22"
                                rx="2"
                                className="logo-bar logo-bar-three"
                            />

                            {/* Rising analytics line-------------- */}
                            <path
                                d="M10 23L17 18L23 20L30 13L38 10"
                                className="logo-chart"
                            />

                            <circle
                                cx="38"
                                cy="10"
                                r="2.5"
                                className="logo-dot"
                            />
                        </svg>

                    </div>

                    <div className="header-logo-content">
                        <span className="header-logo-name">
                            HR<span>Dashboard</span>
                        </span>

                        <span className="header-logo-subtitle">
                            Business Intelligence
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation-------------------------*/}
                <nav className="header-navigation">

                    <Link
                        to="/"
                        className={`header - nav - link ${
    isActive("/") ? "active" : ""
} `}
                    >
                        <span>Home</span>
                    </Link>

                    <Link
                        to="/projects"
                        className={`header - nav - link ${
    isActive("/projects") ? "active" : ""
} `}
                    >
                        <span>Projects</span>
                    </Link>

                    <a
                        href="#about"
                        className="header-nav-link"
                    >
                        <span>About</span>
                    </a>

                </nav>

                {/* Actions------------------------------- */}
                <div className="header-actions">

                    <Link
                        to="/login"
                        className="header-login-button"
                    >
                        <span>Login</span>

                        <svg
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path
                                d="M7 4L13 10L7 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>

                    {/* Mobile menu-------------------------- */}
                    <button
                        type="button"
                        className={`header - menu - button ${
    menuOpen ? "open" : ""
} `}
                        aria-label="Open navigation menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                </div>

            </div>

            {/* Mobile Navigation-------------------------- */}
            <div
                className={`mobile - navigation ${
    menuOpen ? "open" : ""
} `}
            >
                <Link
                    to="/"
                    className={`mobile - nav - link ${
    isActive("/") ? "active" : ""
} `}
                    onClick={closeMenu}
                >
                    Home
                </Link>

                <Link
                    to="/projects"
                    className={`mobile - nav - link ${
    isActive("/projects") ? "active" : ""
} `}
                    onClick={closeMenu}
                >
                    Projects
                </Link>

                <a
                    href="#about"
                    className="mobile-nav-link"
                    onClick={closeMenu}
                >
                    About
                </a>

                <Link
                    to="/login"
                    className="mobile-login-button"
                    onClick={closeMenu}
                >
                    Login
                </Link>
            </div>

        </header>
    );
}

export default Header;

