"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Particles } from "@/components/front/3d/particles";
import { FluidGlass } from "@/components/front/3d/fluid-glass";
import {
    getGPUSettings,
    type ParticleSettings,
} from "@/components/front/3d/utils/gpu-tier";

export default function ParticleCloud({
    refractive = false,
    scale = 1,
    glassBackground = "#0b0b0c",
    warmupMs = 0,
    minWidth = 1081,
    motionSpeed = 1,
}: {
    refractive?: boolean;
    scale?: number;
    glassBackground?: string;
    warmupMs?: number;
    minWidth?: number;
    motionSpeed?: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [gpuSettings, setGpuSettings] = useState<ParticleSettings | null>(null);
    const [particlesReady, setParticlesReady] = useState(false);
    const [envelopeCompensation, setEnvelopeCompensation] = useState(1);
    const [minimumWarmupElapsed, setMinimumWarmupElapsed] = useState(
        warmupMs === 0,
    );
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(`(min-width: ${minWidth}px)`);
        const update = () => setIsDesktop(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, [minWidth]);

    useEffect(() => {
        if (!isDesktop) return;

        let cancelled = false;
        setGpuSettings(null);
        setParticlesReady(false);

        getGPUSettings().then((settings) => {
            if (!cancelled) setGpuSettings(settings);
        });

        return () => {
            cancelled = true;
        };
    }, [isDesktop]);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setPrefersReducedMotion(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin: "120px 0px", threshold: 0.01 },
        );
        observer.observe(container);
        return () => observer.disconnect();
    }, [isDesktop]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateCompensation = () => {
            const renderedSize = Math.min(
                container.clientWidth,
                container.clientHeight,
            );
            const referenceSize = Number.parseFloat(
                window
                    .getComputedStyle(container)
                    .getPropertyValue("--particle-reference-size"),
            );
            const nextCompensation =
                renderedSize > 0 && Number.isFinite(referenceSize)
                    ? referenceSize / renderedSize
                    : 1;

            setEnvelopeCompensation((current) =>
                Math.abs(current - nextCompensation) > 0.001
                    ? nextCompensation
                    : current,
            );
        };

        updateCompensation();
        const observer = new ResizeObserver(updateCompensation);
        observer.observe(container);
        return () => observer.disconnect();
    }, [isDesktop]);

    useEffect(() => {
        if (!isDesktop || warmupMs === 0) {
            setMinimumWarmupElapsed(true);
            return;
        }

        setMinimumWarmupElapsed(false);
        const timeout = window.setTimeout(
            () => setMinimumWarmupElapsed(true),
            warmupMs,
        );
        return () => window.clearTimeout(timeout);
    }, [isDesktop, warmupMs]);

    if (!isDesktop) return null;

    const isReady = particlesReady && minimumWarmupElapsed;
    // The larger refractive pane makes the dense ring read slightly smaller
    // even when its nominal diameter is preserved. Restore that visual weight
    // without increasing the canvas backing resolution.
    const sceneScale = scale * envelopeCompensation * 1.1;
    const renderDpr = gpuSettings
        ? gpuSettings.maxDpr * envelopeCompensation
        : 1;

    // With reduced motion enabled, let the scene settle behind its warm-up
    // curtain, then retain that frame instead of continually animating it.
    const sceneActive = isVisible && (!prefersReducedMotion || !isReady);

    return (
        <div
            ref={containerRef}
            data-particle-cloud
            data-ready={isReady}
            style={{
                width: "100%",
                height: "100%",
                opacity: isReady ? 1 : 0,
                visibility: isReady ? "visible" : "hidden",
                transition: "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            data-gpu-tier={gpuSettings?.tier}
            data-particle-count={gpuSettings ? gpuSettings.size ** 2 : undefined}
            data-envelope-compensation={envelopeCompensation.toFixed(3)}
            data-motion-speed={motionSpeed}
        >
            {gpuSettings ? (
                <Canvas
                    aria-hidden="true"
                    camera={{ position: [0, 0, 3] }}
                    dpr={renderDpr}
                    frameloop={sceneActive ? "always" : "never"}
                    gl={{ alpha: true, antialias: gpuSettings.antialias }}
                >
                    {refractive ? (
                        <color attach="background" args={[glassBackground]} />
                    ) : null}
                    <group scale={sceneScale}>
                        <Particles
                            active={sceneActive}
                            settings={gpuSettings}
                            onReady={() => setParticlesReady(true)}
                            readyAfterFrames={75}
                            motionSpeed={motionSpeed}
                        />
                    </group>
                    {refractive ? (
                        <FluidGlass
                            backgroundColor={glassBackground}
                            samples={gpuSettings.glassSamples}
                            resolution={gpuSettings.glassResolution}
                            ior={1.1}
                            thickness={1.4}
                            chromaticAberration={0.055}
                            distortion={0.85}
                            temporalDistortion={0}
                        />
                    ) : null}
                </Canvas>
            ) : null}
        </div>
    );
}
