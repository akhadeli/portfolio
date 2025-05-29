"use client";

import { ReactLenis } from "lenis/react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/front/preloader";
import Scene from "@/components/front/3d/scene";
import Hero from "@/components/front/hero";
import About from "@/components/front/about";
import Skills from "@/components/front/skills";
import Experience from "@/components/front/experience";
import Projects from "@/components/front/projects";
import Contact from "@/components/front/contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <ReactLenis root>
      <div className="relative min-h-screen">
        {/* Preloader */}
        <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

        {/* Hero Section with 3D Background */}
        <div className="relative min-h-screen">
          {/* 3D Particle Background - Only for Hero */}
          <div className="relative inset-0 z-0 h-screen">
            <Scene />
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
