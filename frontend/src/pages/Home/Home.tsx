//imports-----------------------
import Hero from "../../components/Public/Hero/Hero";
import PlatformSection from "../../components/Public/PlatformSection/PlatformSection";
import SolutionsSection from "../../components/Public/SolutionsSection/SolutionsSection";
import DashboardShowcase from "../../components/Public/DashboardShowcase/DashboardShowcase.tsx";
import WhySection from "../../components/Public/WhySection/WhySection.tsx";
import FinalCTA from "../../components/Public/FinalCTA/FinalCTA.tsx";
//components-----------------------
function Home() {
    return (
        <div>
            <>
            <Hero />

                <PlatformSection />

                <SolutionsSection />

                <DashboardShowcase />

                <WhySection />

                <FinalCTA />
            </>
        </div>
    );
}

export default Home;