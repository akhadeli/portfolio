"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
    Cloud,
    Brain,
    Network,
    Eye,
    Boxes,
    MessageSquare,
    FileText,
    CheckCircle,
} from "lucide-react";
import {
    siTypescript,
    siJavascript,
    siPython,
    siGo,
    siCplusplus,
    siNvidia,
    siOpenjdk,
    siMysql,
    siNextdotjs,
    siReact,
    siExpo,
    siDjango,
    siFlask,
    siFastapi,
    siExpress,
    siLangchain,
    siVercel,
    siPytorch,
    siTensorflow,
    siOpencv,
    siRos,
    siAmazon,
    siGooglecloud,
    siDocker,
    siKubernetes,
    siFirebase,
    siSupabase,
    siElasticsearch,
    siLinux,
    siGithubactions,
    siOpenapiinitiative,
    siGit,
    siJira,
    siVitest,
    siPostgresql,
} from "simple-icons";
import React from "react";

// Technology icon mapping
const techIcons = {
    TypeScript: siTypescript,
    JavaScript: siJavascript,
    Python: siPython,
    Golang: siGo,
    "C/C++": siCplusplus,
    CUDA: siNvidia,
    Java: siOpenjdk,
    SQL: siMysql,
    "Next.js": siNextdotjs,
    React: siReact,
    "React Native": siReact,
    Expo: siExpo,
    Django: siDjango,
    "Flask/Quart": siFlask,
    FastAPI: siFastapi,
    Express: siExpress,
    LangChain: siLangchain,
    "Vercel AI SDK": siVercel,
    PyTorch: siPytorch,
    PostgreSQL: siPostgresql,
    TensorFlow: siTensorflow,
    CoreGraph: Network,
    OpenCV: siOpencv,
    COLMAP: Eye,
    "ORB-SLAM": Eye,
    "Gaussian Splatting": Boxes,
    NeRF: Brain,
    ROS: siRos,
    Azure: Cloud,
    AWS: siAmazon,
    "Google Cloud": siGooglecloud,
    Docker: siDocker,
    Kubernetes: siKubernetes,
    Firebase: siFirebase,
    Supabase: siSupabase,
    Elasticsearch: siElasticsearch,
    Linux: siLinux,
    "CI/CD": siGithubactions,
    Microservices: Boxes,
    "Pub/Sub": MessageSquare,
    MVC: FileText,
    REST: siOpenapiinitiative,
    gRPC: Network,
    Git: siGit,
    Jira: siJira,
    Scrum: CheckCircle,
    "Vitest/Jest": siVitest,
};

const skillRows = [
    {
        label: "Languages",
        duration: 30,
        skills: [
            "TypeScript",
            "JavaScript",
            "Python",
            "Golang",
            "C/C++",
            "CUDA",
            "Java",
            "SQL",
        ],
    },
    {
        label: "Frameworks & APIs",
        duration: 38,
        skills: [
            "Next.js",
            "React",
            "React Native",
            "Expo",
            "Django",
            "Flask/Quart",
            "FastAPI",
            "Express",
            "REST",
            "gRPC",
        ],
    },
    {
        label: "AI, ML & Vision",
        duration: 42,
        skills: [
            "LangChain",
            "Vercel AI SDK",
            "PyTorch",
            "TensorFlow",
            "CoreGraph",
            "OpenCV",
            "COLMAP",
            "ORB-SLAM",
            "Gaussian Splatting",
            "NeRF",
            "ROS",
        ],
    },
    {
        label: "Cloud, Data & Tooling",
        duration: 60,
        skills: [
            "Azure",
            "AWS",
            "Google Cloud",
            "Docker",
            "Kubernetes",
            "CI/CD",
            "Firebase",
            "Supabase",
            "PostgreSQL",
            "Elasticsearch",
            "Linux",
            "Git",
            "Vitest/Jest",
            "Microservices",
            "Pub/Sub",
            "Jira",
            "Scrum",
        ],
    },
];

function SkillIcon({ name }: { name: string }) {
    const iconData = techIcons[name as keyof typeof techIcons];
    if (!iconData) return null;

    if ("path" in iconData) {
        return (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0"
            >
                <path d={iconData.path} />
            </svg>
        );
    }

    return React.createElement(iconData, {
        className: "w-[18px] h-[18px] shrink-0",
    });
}

function MarqueeRow({
    label,
    skills,
    duration,
    reverse,
}: {
    label: string;
    skills: string[];
    duration: number;
    reverse: boolean;
}) {
    // Content is duplicated once; the keyframe translates -50% for a seamless loop
    const items = [...skills, ...skills];

    return (
        <div className="skill-row group">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
                {label}
            </div>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div
                    className="marquee-track flex w-max group-hover:[animation-play-state:paused]"
                    style={{
                        animationDuration: `${duration}s`,
                        animationDirection: reverse ? "reverse" : "normal",
                    }}
                >
                    {items.map((name, i) => (
                        <div
                            key={`${name}-${i}`}
                            className="flex items-center gap-2.5 px-6 text-muted-foreground hover:text-foreground transition-colors duration-300 whitespace-nowrap"
                        >
                            <SkillIcon name={name} />
                            <span className="text-sm tracking-wide">
                                {name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

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

        // Rows slide in from alternating sides
        gsap.utils
            .toArray<HTMLElement>(".skill-row")
            .forEach((row, index) => {
                gsap.fromTo(
                    row,
                    { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 90%",
                        },
                    },
                );
            });
    }, []);

    return (
        <section ref={sectionRef} id="skills" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-14">
                    <h2 className="text-lg md:text-xl font-light tracking-[0.3em] text-muted-foreground uppercase mb-4">
                        Skills
                    </h2>
                    <div className="w-16 h-px bg-border mx-auto" />
                </div>

                {/* Skill Marquees */}
                <div ref={rowsRef} className="space-y-10">
                    {skillRows.map((row, index) => (
                        <MarqueeRow
                            key={row.label}
                            label={row.label}
                            skills={row.skills}
                            duration={row.duration}
                            reverse={index % 2 === 1}
                        />
                    ))}
                </div>

                {/* Description */}
                <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-14">
                    Breadth matters, but only when it serves delivery. I use
                    this stack to move from prototype to production quickly
                    while keeping systems understandable.
                </p>
            </div>
        </section>
    );
}
