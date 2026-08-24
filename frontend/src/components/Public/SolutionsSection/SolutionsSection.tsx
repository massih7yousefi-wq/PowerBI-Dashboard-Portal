import { useState } from "react";
import "./SolutionsSection.css";

const solutions = [
    {
        id: "01",
        title: "Workforce Analytics",
        description:
            "Understand workforce trends, organizational patterns, performance, and the factors shaping your people.",
        label: "WORKFORCE",
    },
    {
        id: "02",
        title: "HR Dashboards",
        description:
            "Bring critical HR metrics into clear, interactive dashboards built for faster and more confident decisions.",
        label: "HR ANALYTICS",
    },
    {
        id: "03",
        title: "Talent Analytics",
        description:
            "Turn talent data into meaningful insights across recruitment, retention, performance, and employee development.",
        label: "TALENT",
    },
    {
        id: "04",
        title: "Business Intelligence",
        description:
            "Connect complex business data with powerful analytics to reveal opportunities and support strategic decisions.",
        label: "BUSINESS INTELLIGENCE",
    },
];

function SolutionsSection() {
    const [activeSolution, setActiveSolution] = useState(0);

    const active = solutions[activeSolution];

    return (
        <section className="solutions-section">

            <div className="solutions-container">

                {/* Header */}
                <div className="solutions-heading">

                    <span className="solutions-eyebrow">
                        SOLUTIONS
                    </span>

                    <h2>
                        Analytics Built
                        <span> Around Your Business.</span>
                    </h2>

                    <p>
                        From workforce insights to business intelligence,
                        turn complex data into information your organization
                        can actually use.
                    </p>

                </div>


                {/* Solutions */}
                <div className="solutions-layout">

                    {/* Navigation */}
                    <div className="solutions-list">

                        {solutions.map((solution, index) => (
                            <button
                                key={solution.id}
                                type="button"
                                className={`solution-item ${
                                    activeSolution === index
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setActiveSolution(index)
                                }
                            >

                                <span className="solution-number">
                                    {solution.id}
                                </span>

                                <span className="solution-title">
                                    {solution.title}
                                </span>

                                <span className="solution-arrow">
                                    →
                                </span>

                            </button>
                        ))}

                    </div>


                    {/* Content */}
                    <div className="solution-content">

                        <div className="solution-content-top">

                            <span className="solution-label">
                                {active.label}
                            </span>

                            <span className="solution-index">
                                {active.id}
                            </span>

                        </div>


                        <div className="solution-visual">

                            <div className="solution-visual-grid" />

                            <div className="solution-visual-card">

                                <div className="visual-card-header">
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <div className="visual-chart">

                                    <div className="chart-line chart-line-one" />
                                    <div className="chart-line chart-line-two" />
                                    <div className="chart-line chart-line-three" />

                                </div>

                            </div>

                        </div>


                        <div className="solution-content-info">

                            <h3>
                                {active.title}
                            </h3>

                            <p>
                                {active.description}
                            </p>

                            <button
                                type="button"
                                className="solution-link"
                            >
                                Explore Solution

                                <span>
                                    →
                                </span>
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SolutionsSection;