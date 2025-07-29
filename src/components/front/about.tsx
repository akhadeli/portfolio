"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { Award, TrendingUp, Users, Zap } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
        },
      }
    );

    // Content animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "bottom 20%",
        },
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.h2
            className="text-lg md:text-xl font-light tracking-[0.3em] text-muted-foreground uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            About
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-border mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
        </div>

        {/* Main Content */}
        <div
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Left Column - Profile & Story */}
          <div className="space-y-16">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center"
            >
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-600/20 to-zinc-700/20 rounded-full rotate-6"></div>
                <div className="relative w-full h-full bg-zinc-800 rounded-full overflow-hidden border-4 border-primary/10 shadow-2xl">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Abdullah Khadeli - AI/UI Engineer Team Lead"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full shadow-lg"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full shadow-lg"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/2 -right-8 w-4 h-4 bg-primary rounded-full shadow-lg"
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card/30 rounded-xl p-6 border border-border hover:border-primary/20 transition-all duration-300"
            >
              <h4 className="text-foreground font-medium mb-4">Quick Facts</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Role</span>
                  <span className="text-foreground">
                    Lead AI/UI Engineer at TENN.ai
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="text-foreground">3+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Graduated</span>
                  <span className="text-foreground">June 2025</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Story */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl md:text-4xl font-light text-foreground mb-6 leading-relaxed">
                Full-Stack Developer & Team Lead
              </h3>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  Graduated with a B.S. in Computing Science with Specialization
                  from the University of Alberta in June 2025. I focus on
                  building scalable systems and leading teams to deliver
                  high-performance solutions.
                </p>

                <p className="text-lg">
                  I specialize in building enterprise AI platforms, performance
                  optimization, and full-stack development.
                </p>
              </div>
            </motion.div>

            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="bg-card/30 rounded-xl p-6 border border-border hover:border-primary/20 transition-all duration-300"
            >
              <h4 className="text-foreground font-medium mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Key Highlights
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>
                    Led engineering teams to deliver products to market
                  </span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Users className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>
                    Showcased products to 25,000+ attendees at Web Summit Doha
                  </span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>
                    Built platforms serving users with custom AI orchestration
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Core Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          <div className="bg-card/30 rounded-xl p-8 border border-border hover:border-primary/20 transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
              <Zap className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <h4 className="text-foreground font-medium mb-2">AI Engineering</h4>
            <p className="text-sm text-muted-foreground">
              LLM Orchestration, Performance Optimization, Machine Learning
            </p>
          </div>

          <div className="bg-card/30 rounded-xl p-8 border border-border hover:border-primary/20 transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
              <Users className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <h4 className="text-foreground font-medium mb-2">
              Team Leadership
            </h4>
            <p className="text-sm text-muted-foreground">
              Engineering Teams, Product Strategy, Mentoring
            </p>
          </div>

          <div className="bg-card/30 rounded-xl p-8 border border-border hover:border-primary/20 transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
              <TrendingUp className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <h4 className="text-foreground font-medium mb-2">
              Full-Stack Development
            </h4>
            <p className="text-sm text-muted-foreground">
              Enterprise Platforms, Scalable Solutions, Performance
            </p>
          </div>
        </motion.div>

        {/* Education & Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center bg-card/20 rounded-xl p-8 border border-border hover:border-primary/20 transition-all duration-300"
        >
          <div className="space-y-4">
            <div>
              <div className="text-xl text-foreground font-light">
                University of Alberta
              </div>
              <div className="text-muted-foreground">
                B.S. Computing Science with Specialization
              </div>
              <div className="text-sm text-muted-foreground">
                Graduated June 2025
              </div>
            </div>

            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Currently based in Edmonton, Alberta
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
