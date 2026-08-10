import PortfolioLanding from "@/components/redesign/portfolio-landing";
import PortfolioSmoothScroll from "@/components/redesign/portfolio-smooth-scroll";

export default function Home() {
    return (
        <PortfolioSmoothScroll>
            <PortfolioLanding
                variant="personal"
                headingRefractionStrength={0.68}
            />
        </PortfolioSmoothScroll>
    );
}
