import { Link } from "react-router-dom";
import "./FinalCTA.css";

function FinalCTA() {
    return (
        <section className="final-cta">

            <div className="final-cta-background">
                <div className="final-cta-glow final-cta-glow-one" />
                <div className="final-cta-glow final-cta-glow-two" />
                <div className="final-cta-grid" />
            </div>


            <div className="final-cta-container">

                <div className="final-cta-content">

                    <span className="final-cta-eyebrow">
                        READY TO GO FURTHER?
                    </span>

                    <h2>
                        Your Data Has
                        <span> More To Say.</span>
                    </h2>

                    <p>
                        Explore powerful dashboards and discover
                        what your data can reveal about your business.
                    </p>


                    <div className="final-cta-actions">

                        <Link
                            to="/projects"
                            className="final-cta-primary"
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

                        <Link
                            to="/projects"
                            className="final-cta-secondary"
                        >
                            View Projects
                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default FinalCTA;