"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";
import { FluidGlass } from "./fluid-glass";

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "120px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full [&_canvas]:h-full [&_canvas]:w-full"
    >
      <Canvas
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 3] }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? "always" : "never"}
      >
        <Particles active={isVisible} />
        <FluidGlass />
      </Canvas>
    </div>
  );
}
