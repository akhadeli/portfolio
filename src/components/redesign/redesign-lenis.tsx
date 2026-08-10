"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";

export default function RedesignLenis({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<LenisRef>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setPrefersReducedMotion(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const handleAnchorClick = (event: MouseEvent) => {
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const clickedElement = event.target;
            if (!(clickedElement instanceof Element)) return;

            const anchor = clickedElement.closest<HTMLAnchorElement>(
                'a[href^="#"]',
            );
            if (!anchor || anchor.dataset.nativeAnchor !== undefined) return;

            const hash = anchor.getAttribute("href");
            if (!hash || hash === "#") return;

            const target = document.querySelector<HTMLElement>(hash);
            const lenis = lenisRef.current?.lenis;
            if (!target || !lenis) return;

            event.preventDefault();
            if (window.location.hash !== hash) {
                window.history.pushState(null, "", hash);
            }
            lenis.scrollTo(target);
        };

        document.addEventListener("click", handleAnchorClick, true);
        return () =>
            document.removeEventListener("click", handleAnchorClick, true);
    }, [prefersReducedMotion]);

    if (prefersReducedMotion) return children;

    return (
        <ReactLenis ref={lenisRef} root options={{ anchors: false }}>
            {children}
        </ReactLenis>
    );
}
