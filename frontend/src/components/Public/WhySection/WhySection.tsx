import "./WhySection.css";

const advantages = [
    {
        number: "01",
        title: "Clarity",
        description:
            "Turn complex business data into clear, meaningful information that anyone can understand."
    },
    {
        number: "02",
        title: "Connected Insights",
        description:
            "Bring important metrics and business information together in one connected analytical view."
    },
    {
        number: "03",
        title: "Better Decisions",
        description:
            "Give decision-makers the insights they need to act with greater confidence and precision."
    }
];

function WhySection() {
    return (
        <section className="why-section">

            <div className="why-container">

                {/* Heading */}
                <div className="why-heading">

                    <span className="why-eyebrow">
                        WHY HRDASHBOARD
                    </span>

                    <h2>
                        Data Is Everywhere.
                        <span> Insight Should Be Clear.</span>
                    </h2>

                    <p>
                        HRDashboard helps organizations move from
                        scattered information to focused, actionable
                        intelligence.
                    </p>

                </div>


                {/* Main Content */}
                <div className="why-content">

                    {/* Visual */}
                    <div className="why-visual">

                        <div className="why-visual-glow" />

                        <div className="why-orbit why-orbit-one" />
                        <div className="why-orbit why-orbit-two" />

                        <div className="why-center">

                            <div className="why-center-icon">

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M4 18V11" />
                                    <path d="M9 18V7" />
                                    <path d="M14 18V9" />
                                    <path d="M19 18V4" />
                                    <path d="M3 20H21" />
                                </svg>

                            </div>

                            <span>
                                DATA
                            </span>

                            <strong>
                                INSIGHT
                            </strong>

                        </div>

                    </div>


                    {/* Advantages */}
                    <div className="why-advantages">

                        {advantages.map((item) => (
                            <article
                                className="why-advantage"
                                key={item.number}
                            >

                                <span className="why-number">
                                    {item.number}
                                </span>

                                <div className="why-advantage-content">

                                    <h3>
                                        {item.title}
                                    </h3>

                                    <p>
                                        {item.description}
                                    </p>

                                </div>

                            </article>
                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default WhySection;