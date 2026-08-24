import "./PlatformSection.css";

function PlatformSection() {
    return (
        <section className="platform-section">

            <div className="platform-background">
                <div className="platform-glow platform-glow-one" />
                <div className="platform-glow platform-glow-two" />
                <div className="platform-grid-lines" />
            </div>


            <div className="platform-container">

                {/* =================================================
                    Header
                   ================================================= */}

                <div className="platform-heading">

                    <div className="platform-heading-top">

                        <span className="platform-heading-line" />

                        <span className="platform-eyebrow">
                            POWERFUL ANALYTICS
                        </span>

                    </div>

                    <h2>
                        Turn Data Into
                        <span> Better Decisions.</span>
                    </h2>

                    <p>
                        Transform complex workforce and business data
                        into clear insights that help organizations
                        understand, analyze, and act with confidence.
                    </p>

                </div>


                {/* =================================================
                    Cards
                   ================================================= */}

                <div className="platform-grid">

                    {/* Card 01 */}

                    <article className="platform-card">

                        <div className="platform-card-glow" />

                        <div className="platform-card-top">

                            <span className="platform-card-number">
                                01
                            </span>

                            <span className="platform-card-arrow">
                                ↗
                            </span>

                        </div>


                        <div className="platform-card-icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="3"
                                />

                                <path d="M8 16V13" />
                                <path d="M12 16V10" />
                                <path d="M16 16V7" />

                            </svg>

                        </div>


                        <div className="platform-card-content">

                            <h3>
                                Understand Your Data
                            </h3>

                            <p>
                                Bring complex business and workforce data
                                into one clear and understandable view.
                            </p>

                        </div>


                        <div className="platform-card-line" />

                    </article>


                    {/* Card 02 */}

                    <article className="platform-card">

                        <div className="platform-card-glow" />

                        <div className="platform-card-top">

                            <span className="platform-card-number">
                                02
                            </span>

                            <span className="platform-card-arrow">
                                ↗
                            </span>

                        </div>


                        <div className="platform-card-icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4 17L9 12L13 15L20 7"
                                />

                                <path
                                    d="M16 7H20V11"
                                />

                                <circle
                                    cx="9"
                                    cy="12"
                                    r="1.5"
                                />

                                <circle
                                    cx="13"
                                    cy="15"
                                    r="1.5"
                                />

                            </svg>

                        </div>


                        <div className="platform-card-content">

                            <h3>
                                Analyze What Matters
                            </h3>

                            <p>
                                Discover patterns, trends, and meaningful
                                insights through interactive analytics.
                            </p>

                        </div>


                        <div className="platform-card-line" />

                    </article>


                    {/* Card 03 */}

                    <article className="platform-card">

                        <div className="platform-card-glow" />

                        <div className="platform-card-top">

                            <span className="platform-card-number">
                                03
                            </span>

                            <span className="platform-card-arrow">
                                ↗
                            </span>

                        </div>


                        <div className="platform-card-icon">

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

                                <circle
                                    cx="12"
                                    cy="5"
                                    r="1.5"
                                />

                            </svg>

                        </div>


                        <div className="platform-card-content">

                            <h3>
                                Make Better Decisions
                            </h3>

                            <p>
                                Turn data-driven insights into confident
                                decisions and measurable business outcomes.
                            </p>

                        </div>


                        <div className="platform-card-line" />

                    </article>

                </div>


                {/* =================================================
                    Bottom Indicator
                   ================================================= */}

                <div className="platform-bottom">

                    <span className="platform-bottom-line" />

                    <span>
                        DATA → INSIGHT → ACTION
                    </span>

                    <span className="platform-bottom-line" />

                </div>

            </div>

        </section>
    );
}

export default PlatformSection;