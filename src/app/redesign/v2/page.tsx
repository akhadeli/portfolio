import type { Metadata } from "next";
import CodeStorageRedesign from "@/components/redesign/code-storage-redesign";
import RedesignLenis from "@/components/redesign/redesign-lenis";

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
        <RedesignLenis>
            <CodeStorageRedesign
                variant="personal"
                headingRefractionStrength={0.68}
            />
        </RedesignLenis>
    );
}
