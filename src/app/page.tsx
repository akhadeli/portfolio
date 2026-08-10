"use client";

import dynamic from "next/dynamic";
import { ReactLenis } from "lenis/react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Preloader from "@/components/front/preloader";
import Hero from "@/components/front/hero";
import About from "@/components/front/about";
import Skills from "@/components/front/skills";
import Experience from "@/components/front/experience";
import Projects from "@/components/front/projects";
import Contact from "@/components/front/contact";

const Scene = dynamic(() => import("@/components/front/3d/scene"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full bg-background" aria-hidden="true" />
    ),
});

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [showScene, setShowScene] = useState(false);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setIsLoading(false);
        }, 1800);

        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (isLoading || showScene) return;

        const loadScene = () => setShowScene(true);
        const win = window as typeof window & {
            requestIdleCallback?: (
                callback: () => void,
                options?: { timeout: number },
            ) => number;
            cancelIdleCallback?: (handle: number) => void;
        };

        if (win.requestIdleCallback) {
            const idleId = win.requestIdleCallback(loadScene, {
                timeout: 1200,
            });
            return () => win.cancelIdleCallback?.(idleId);
        }

        const timeoutId = window.setTimeout(loadScene, 300);
        return () => window.clearTimeout(timeoutId);
    }, [isLoading, showScene]);

    return (
        <ReactLenis root>
            <div className="relative min-h-screen">
                {/* Preloader */}
                <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

                {/* Hero Section with 3D Background */}
                <div className="relative min-h-screen">
                    {/* 3D Particle Background - Only for Hero */}
                    <div className="relative inset-0 z-0 h-screen">
                        {showScene ? (
                            <Scene />
                        ) : (
                            <div
                                className="h-full w-full bg-background"
                                aria-hidden="true"
                            />
                        )}
                        <Hero />
                    </div>
                </div>

                {/* Other Sections with Background Variable */}
                <div className="bg-background">
                    {/* About Section */}
                    <About />

                    {/* Experience Section */}
                    <Experience />

                    {/* Skills Section */}
                    <Skills />

                    {/* Projects Section */}
                    <Projects />

                    {/* Contact Section */}
                    <Contact />
                </div>
            </div>
        </ReactLenis>
    );
}
