import type { Metadata } from "next";
import PortfolioLanding from "@/components/redesign/portfolio-landing";

export const metadata: Metadata = {
    title: "Portfolio Redesign Preview",
    description:
        "A private, document-style redesign preview for Abdullah Khadeli's portfolio.",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function RedesignPage() {
    return <PortfolioLanding />;
}
