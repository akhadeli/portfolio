import type { Metadata } from "next";
import PortfolioLanding from "@/components/redesign/portfolio-landing";
import PortfolioSmoothScroll from "@/components/redesign/portfolio-smooth-scroll";

export const metadata: Metadata = {
    title: "Portfolio Redesign — Iteration Two",
    description:
        "A private portfolio redesign exploration combining editorial typography and interactive 3D.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function RedesignIterationTwoPage() {
    return (
        <PortfolioSmoothScroll>
            <PortfolioLanding
                variant="personal"
                headingRefractionStrength={0.68}
            />
        </PortfolioSmoothScroll>
    );
}
