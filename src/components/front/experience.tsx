"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
    {
        company: "Starise",
        role: "Product Engineer",
        period: "Apr 2026 - Present",
        duration: "2+ months",
        location: "Doha, Qatar",
        type: "Full-time",
        description:
            "Building product features for Starise, a platform that helps businesses turn happy customers into authentic reviews.",
        achievements: [
            {
                title: "Full-Stack Delivery",
                description:
                    "Shipping customer-facing features end to end across TanStack Start, Next.js, and Django services",
                metric: "Product engineering",
            },
            {
                title: "Technical Leadership",
                description:
                    "Driving technical direction and delivery on Azure-backed infrastructure",
                metric: "Leadership",
            },
        ],
        technologies: [
            "TanStack Start",
            "Next.js",
            "Django",
            "React",
            "Azure",
            "Leadership",
        ],
    },
    {
        company: "TENN.ai (KAIC.ai)",
        role: "Lead AI/UI Engineer",
        period: "Aug 2024 - Dec 2025",
        duration: "1 yr 5 mos",
        location: "Remote",
        type: "Full-time",
        description:
            "Leading product engineering for AI platforms with a focus on reliability, speed, and clearer user workflows.",
        achievements: [
            {
                title: "Performance Engineering",
                description:
                    "Reworked rendering and data-loading paths to improve perceived speed by 4x",
                metric: "Performance",
            },
            {
                title: "Team Leadership",
                description:
                    "Set delivery plans and technical direction across product cycles",
                metric: "Leadership",
            },
            {
                title: "Product Showcase",
                description: "Presented platform outcomes at Web Summit Doha",
                metric: "Global recognition",
            },
            {
                title: "Growth Metrics",
                description:
                    "Shipped features tied to user-facing growth goals",
                metric: "Brand visibility",
            },
        ],
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "AI/ML",
            "Team Leadership",
        ],
    },
    {
        company: "Gradekick",
        role: "Founding Engineer",
        period: "Jun 2024 - Present",
        duration: "11+ months",
        location: "Edmonton, AB",
        type: "Full-time",
        description:
            "Building an EdTech product from zero to production with custom AI orchestration and cloud-native deployment.",
        achievements: [
            {
                title: "Platform Scale",
                description:
                    "Built core product and platform foundations from scratch",
                metric: "Global users",
            },
            {
                title: "AI Architecture",
                description:
                    "Designed internal orchestration layer to simplify model workflows",
                metric: "Performance",
            },
            {
                title: "Cloud Infrastructure",
                description:
                    "Set up Azure Kubernetes deployment paths with faster release cycles",
                metric: "DevOps",
            },
            {
                title: "Founding Impact",
                description:
                    "Owned major architecture decisions as part of the founding team",
                metric: "Founding Engineer",
            },
        ],
        technologies: [
            "Next.js",
            "Express",
            "PostgreSQL",
            "Milvus",
            "Azure",
            "Kubernetes",
        ],
    },
    {
        company: "Dibsy",
        role: "Software Development Intern",
        period: "Jun 2023 – Aug 2023",
        duration: "3 months",
        location: "Doha, Qatar",
        type: "Internship",
        description:
            "Built analytics and processing improvements for high-volume fintech workflows.",
        achievements: [
            {
                title: "Analytics Optimization",
                description:
                    "Built analytics interface reducing report generation from 72 hours to under 2 minutes",
                metric: "72h → <2min",
            },
            {
                title: "Data Pipeline",
                description:
                    "Optimized data pipeline for 15,000+ daily records with a 12% speed gain",
                metric: "12% faster",
            },
            {
                title: "Visualization Systems",
                description:
                    "Designed and implemented real-time data visualization dashboards",
                metric: "Real-time",
            },
            {
                title: "Fintech Integration",
                description:
                    "Worked with financial data systems and compliance requirements",
                metric: "Fintech domain",
            },
        ],
        technologies: [
            "Golang",
            "MongoDB",
            "Elasticsearch",
            "Data Analytics",
            "Fintech",
            "Performance Optimization",
            "Fraud Detection",
        ],
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const experiencesRef = useRef<HTMLDivElement>(null);

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
                    start: "top 85%",
                },
            },
        );

        // Timeline line draws itself as the section scrolls
        gsap.fromTo(
            ".timeline-line",
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                transformOrigin: "top center",
                scrollTrigger: {
                    trigger: experiencesRef.current,
                    start: "top 70%",
                    end: "bottom 70%",
                    scrub: 1,
                },
            },
        );

        gsap.utils.toArray<HTMLElement>(".experience-item").forEach((item) => {
            // Timeline dot pops in
            gsap.fromTo(
                item.querySelector(".timeline-dot"),
                { scale: 0 },
                {
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(2.5)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                },
            );

            // Columns slide in from opposite sides
            gsap.fromTo(
                item.querySelector(".exp-content"),
                { opacity: 0, x: -80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                },
            );
            gsap.fromTo(
                item.querySelector(".exp-achievements"),
                { opacity: 0, x: 80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                },
            );

            // Achievement rows stagger in
            gsap.fromTo(
                item.querySelectorAll(".achievement-row"),
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.12,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                },
            );

            // Tech pills stagger in
            gsap.fromTo(
                item.querySelectorAll(".tech-pill"),
                { opacity: 0, y: 8 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    stagger: 0.05,
                    delay: 0.4,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                },
            );
        });
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="text-lg md:text-xl font-light tracking-[0.3em] text-muted-foreground uppercase mb-4">
                        Experience
                    </h2>
                    <div className="w-16 h-px bg-border mx-auto" />
                </div>

                {/* Experience Timeline */}
                <div ref={experiencesRef} className="relative">
                    {/* Timeline Line */}
                    <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-px bg-border h-full hidden lg:block"></div>

                    <div className="space-y-24">
                        {experiences.map((exp) => {
                            return (
                                <div
                                    key={exp.company}
                                    className="experience-item relative"
                                >
                                    {/* Timeline Dot */}
                                    <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary/20 rounded-full border-4 border-background z-10 hidden lg:block"></div>

                                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                                        {/* Content */}
                                        <div className="exp-content lg:pr-12">
                                            {/* Company Header */}
                                            <div className="mb-6">
                                                <h3 className="text-2xl font-light text-foreground hover:text-primary transition-colors duration-300">
                                                    {exp.role}
                                                </h3>
                                                <div className="text-lg text-muted-foreground font-medium">
                                                    {exp.company}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4 text-primary" />
                                                        {exp.period}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4 text-primary" />
                                                        {exp.location}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-muted-foreground leading-relaxed mb-6">
                                                {exp.description}
                                            </p>

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map(
                                                    (tech) => (
                                                        <span
                                                            key={tech}
                                                            className="tech-pill text-xs px-3 py-1 rounded-full border border-border text-muted-foreground hover:border-primary/20 hover:text-primary transition-all duration-300"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="exp-achievements lg:pl-12">
                                            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
                                                Key Achievements
                                            </h4>
                                            <ul className="space-y-6 border-l border-border pl-6">
                                                {exp.achievements.map(
                                                    (achievement, achIndex) => (
                                                        <li
                                                            key={achIndex}
                                                            className="achievement-row"
                                                        >
                                                            <div className="flex items-baseline justify-between gap-4 mb-1">
                                                                <span className="text-foreground text-sm font-medium">
                                                                    {
                                                                        achievement.title
                                                                    }
                                                                </span>
                                                                <span className="text-xs text-primary whitespace-nowrap">
                                                                    {
                                                                        achievement.metric
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="text-sm text-muted-foreground leading-relaxed">
                                                                {
                                                                    achievement.description
                                                                }
                                                            </div>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
