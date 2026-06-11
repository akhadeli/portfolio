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
            },
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
            },
        );
    }, []);

    return (
        <section ref={sectionRef} id="about" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-14">
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
                    className="grid lg:grid-cols-2 gap-16 items-center mb-14"
                >
                    {/* Left Column - Profile & Story */}
                    <div className="space-y-10">
                        {/* Profile Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative flex justify-center"
                        >
                            <div className="relative w-full h-96 bg-zinc-800 overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/profile.jpeg"
                                    alt="Abdullah Khadeli - AI/UI Engineer Team Lead"
                                    width={320}
                                    height={320}
                                    className="w-full h-full object-cover object-center"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="border-t border-border pt-6"
                        >
                            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
                                Snapshot
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Current Focus
                                    </span>
                                    <span className="text-foreground">
                                        Product engineering for AI teams
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Work Style
                                    </span>
                                    <span className="text-foreground">
                                        Hands-on, metrics-led
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Experience
                                    </span>
                                    <span className="text-foreground">
                                        3+ Years
                                    </span>
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
                                Engineer who ships, leads, and simplifies
                            </h3>

                            <div className="space-y-6 text-muted-foreground leading-relaxed">
                                <p className="text-lg">
                                    I care about turning complex ideas into
                                    useful products. My strongest work happens
                                    at the intersection of engineering, product
                                    thinking, and execution speed.
                                </p>

                                <p className="text-lg">
                                    I build with clear constraints: fast load
                                    times, clear UX, observable systems, and
                                    architecture teams can maintain.
                                </p>
                            </div>
                        </motion.div>

                        {/* Key Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="border-t border-border pt-6"
                        >
                            <h4 className="text-foreground font-medium mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-primary" />
                                What I optimize for
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                    <span>
                                        Time to value: ship meaningful
                                        increments quickly
                                    </span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Users className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                    <span>
                                        Team clarity: reduce handoff friction
                                        across roles
                                    </span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                    <span>
                                        Performance by default: responsiveness
                                        over feature bloat
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
                    className="grid md:grid-cols-3 gap-8 mb-14"
                >
                    <div className="border-t border-border pt-6 group">
                        <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                            AI Systems
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Tool orchestration, practical ML integration, model
                            workflows
                        </p>
                    </div>

                    <div className="border-t border-border pt-6 group">
                        <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                            Product Engineering
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Architecture, delivery, and maintainable
                            implementation
                        </p>
                    </div>

                    <div className="border-t border-border pt-6 group">
                        <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                            Team Leadership
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Direction-setting, mentoring, and shipping as a team
                        </p>
                    </div>
                </motion.div>

                {/* Education & Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center border-t border-border pt-10"
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
                            Based in Edmonton, Alberta
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
