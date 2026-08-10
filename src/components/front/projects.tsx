"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
    ExternalLink,
    Github,
    Zap,
    Eye,
    Code,
    Smartphone,
    Database,
} from "lucide-react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectLinks {
    github?: string;
    demo?: string;
    paper?: string;
}

interface Project {
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    technologies: Array<{
        name: string;
        icon: React.ComponentType<{ className?: string }>;
    }>;
    metrics: Array<{
        label: string;
        value: string;
    }>;
    features: string[];
    links: ProjectLinks;
    category: "Mobile App" | "Computer Vision";
    status: "Delivered" | "Research";
    image_gallery: Array<{
        src: string;
        alt: string;
        title: string;
    }>;
}

const projects: Project[] = [
    {
        title: "Nexusix",
        subtitle: "Commissioned Social App with Interactive Visualization",
        description:
            "Led end-to-end development of a commissioned social app visualizing user connections via interactive bubbles, delivering a cross-platform MVP for iOS and Android. Implemented scalable backend architecture using Express, Supabase, and PostgreSQL.",
        longDescription:
            "Collaborated with cross-functional teams to define product requirements and optimize user experience. The app features an innovative bubble-based visualization system for social connections, with a robust backend infrastructure designed for scalability.",
        technologies: [
            { name: "React Native", icon: Smartphone },
            { name: "Expo", icon: Smartphone },
            { name: "Express", icon: Code },
            { name: "Node.js", icon: Code },
            { name: "Supabase", icon: Database },
            { name: "PostgreSQL", icon: Database },
            { name: "Jest", icon: Code },
        ],
        metrics: [
            { label: "Timeline", value: "Sep-Dec 2024" },
            { label: "Platforms", value: "iOS & Android" },
            { label: "Type", value: "MVP Delivery" },
        ],
        features: [
            "Interactive bubble visualization",
            "Cross-platform compatibility",
            "Scalable backend architecture",
            "User connection mapping",
        ],
        links: {
            // Removing github link as code cannot be shown
        },
        category: "Mobile App",
        status: "Delivered",
        image_gallery: [
            {
                src: "/images/nexusix-for-you-feed.avif",
                alt: "Nexusix For You Feed",
                title: "For You Feed",
            },
            {
                src: "/images/nexusix-profile-view.avif",
                alt: "Nexusix Profile View",
                title: "Profile View",
            },
            {
                src: "/images/nexusix-share-interface.avif",
                alt: "Nexusix Share Interface",
                title: "Share Interface",
            },
        ],
    },
    {
        title: "SFM-MVS for Photogrammetry",
        subtitle: "Advanced Feature Extraction & 3D Reconstruction",
        description:
            "Developed a custom BRISK-SIFT feature extraction stack achieving 2.3x faster extraction with 29% more high-quality keypoints. Optimized SFM-MVS pipeline with advanced outlier removal, reducing point cloud noise by 40%.",
        longDescription:
            "Research project focused on improving photogrammetry pipeline performance through custom feature extraction and advanced outlier removal. The BRISK-SIFT hybrid approach not only accelerated processing but also improved reconstruction quality, while sophisticated outlier handling significantly enhanced mesh clarity and accuracy.",
        technologies: [
            { name: "OpenCV", icon: Eye },
            { name: "Python", icon: Code },
            { name: "CUDA", icon: Zap },
            { name: "BRISK-SIFT", icon: Eye },
            { name: "Point Cloud", icon: Eye },
        ],
        metrics: [
            { label: "Extraction", value: "2.3x Faster" },
            { label: "Keypoints", value: "+29%" },
            { label: "Noise", value: "-40%" },
        ],
        features: [
            "Custom BRISK-SIFT extraction",
            "Advanced outlier removal",
            "CUDA acceleration",
            "Improved mesh accuracy",
        ],
        links: {
            github: "https://github.com/roddylan/SFM-to-Mesh",
            paper: "https://github.com/roddylan/SFM-to-Mesh/blob/main/report/report.pdf",
        },
        category: "Computer Vision",
        status: "Research",
        image_gallery: [
            {
                src: "/images/sfm-mvs-research-report.jpeg",
                alt: "SFM-MVS Research Report",
                title: "Research Report",
            },
        ],
    },
] as const;

function ProjectGallery({ project }: { project: Project }) {
    if (project.image_gallery.length === 0) return null;

    if (project.category === "Mobile App") {
        return (
            <div className="relative w-full flex items-center justify-center">
                <div className="w-full max-w-[300px] md:max-w-[350px]">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {project.image_gallery.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative w-full aspect-[9/19.5] overflow-hidden rounded-[3rem]">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 350px, 300px"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full max-w-[600px] aspect-[8.5/11] rounded-xl overflow-hidden shadow-2xl">
                <Image
                    src={project.image_gallery[0].src}
                    alt={project.image_gallery[0].alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 600px, 100vw"
                />
            </div>
        </div>
    );
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

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

        // Projects animation
        if (projectsRef.current) {
            const cards = projectsRef.current.querySelectorAll(".project-item");
            gsap.fromTo(
                cards,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: projectsRef.current,
                        start: "top 80%",
                    },
                },
            );
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="py-24 px-6 relative z-0"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="text-lg md:text-xl font-light tracking-[0.3em] text-muted-foreground uppercase mb-4">
                        Selected Work
                    </h2>
                    <div className="w-16 h-px bg-border mx-auto" />
                </div>

                {/* Projects List */}
                <div ref={projectsRef} className="space-y-24">
                    {projects.map((project) => {
                        const isMobileApp = project.category === "Mobile App";

                        return (
                            <div key={project.title} className="project-item">
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    {isMobileApp && (
                                        <ProjectGallery project={project} />
                                    )}

                                    {/* Project Content */}
                                    <div>
                                        {/* Header */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-sm text-muted-foreground/70 uppercase tracking-wide">
                                                    {project.category}
                                                </span>
                                                <div
                                                    className={`w-2 h-2 rounded-full ${
                                                        project.status ===
                                                        "Delivered"
                                                            ? "bg-success"
                                                            : "bg-accent"
                                                    }`}
                                                ></div>
                                                <span className="text-sm text-muted-foreground">
                                                    {project.status}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl font-light text-foreground hover:text-primary transition-colors duration-300 mb-2">
                                                {project.title}
                                            </h3>
                                            <div className="text-lg text-muted-foreground">
                                                {project.subtitle}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-8">
                                            <p className="text-muted-foreground leading-relaxed mb-4">
                                                {project.description}
                                            </p>
                                            <p className="text-muted-foreground/70 leading-relaxed text-sm">
                                                {project.longDescription}
                                            </p>
                                        </div>

                                        {/* Metrics */}
                                        <div className="grid grid-cols-3 divide-x divide-border border-y border-border mb-8">
                                            {project.metrics.map(
                                                (metric, metricIndex) => (
                                                    <div
                                                        key={metricIndex}
                                                        className="py-4 text-center"
                                                    >
                                                        <div className="text-foreground font-medium text-sm mb-1">
                                                            {metric.value}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {metric.label}
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>

                                        {/* Features */}
                                        <div className="mb-8">
                                            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
                                                Key Features
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {project.features.map(
                                                    (feature, featureIndex) => (
                                                        <div
                                                            key={featureIndex}
                                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-muted"></div>
                                                            {feature}
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        {/* Technologies */}
                                        <div className="mb-8">
                                            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
                                                Technologies
                                            </h4>
                                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                                {project.technologies.map(
                                                    (tech) => {
                                                        const TechIcon =
                                                            tech.icon;
                                                        return (
                                                            <div
                                                                key={tech.name}
                                                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                                                            >
                                                                <TechIcon className="w-4 h-4" />
                                                                <span className="text-sm">
                                                                    {tech.name}
                                                                </span>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-4">
                                            {project.links.github && (
                                                <motion.a
                                                    href={project.links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-primary/5 hover:border-primary/20 text-foreground transition-all duration-300"
                                                    whileHover={{ y: -2 }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                >
                                                    <Github className="w-4 h-4" />
                                                    <span className="text-sm font-medium">
                                                        View Code
                                                    </span>
                                                </motion.a>
                                            )}

                                            {project.links.paper && (
                                                <motion.a
                                                    href={project.links.paper}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                                                    whileHover={{ y: -2 }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    <span className="text-sm font-medium">
                                                        View Paper
                                                    </span>
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>

                                    {!isMobileApp && (
                                        <ProjectGallery project={project} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Call to Action */}
                <motion.div
                    className="mt-24 pt-16 border-t border-border text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h4 className="text-2xl font-light text-foreground mb-4">
                        Looking for an engineering partner?
                    </h4>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                        I work best on products that need clear technical
                        direction, thoughtful UX, and fast iteration. If
                        you&apos;re building something ambitious, I&apos;d be
                        glad to help shape and ship it.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            href="mailto:khadeli@threeark.com"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span>Discuss Your Project</span>
                            <ExternalLink className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/akhadeli"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-muted-foreground rounded-lg font-medium hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all duration-300"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span>Message on LinkedIn</span>
                            <ExternalLink className="w-4 h-4" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
