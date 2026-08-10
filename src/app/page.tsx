import CodeStorageRedesign from "@/components/redesign/code-storage-redesign";
import RedesignLenis from "@/components/redesign/redesign-lenis";

export default function Home() {
    return (
        <RedesignLenis>
            <CodeStorageRedesign
                variant="personal"
                headingRefractionStrength={0.68}
            />
        </RedesignLenis>
    );
}
