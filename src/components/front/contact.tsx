"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MapPin, Linkedin, Github, ExternalLink } from "lucide-react";

const socialLinks = [
    {
        label: "LinkedIn",
        url: "https://linkedin.com/in/akhadeli",
        icon: Linkedin,
    },
    {
        label: "GitHub",
        url: "https://github.com/akhadeli",
        icon: Github,
    },
    {
        label: "akhadeli.com",
        url: "https://akhadeli.com",
        icon: ExternalLink,
    },
];

export default function Contact() {
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
                    start: "top 85%",
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
                    start: "top 85%",
                },
                delay: 0.3,
            },
        );
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="py-24 pb-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col gap-12">
                {/* Section Title */}
                <div ref={titleRef} className="text-center">
                    <h2 className="text-lg md:text-xl font-light tracking-[0.3em] text-muted-foreground uppercase mb-4">
                        Contact
                    </h2>
                    <div className="w-16 h-px bg-border mx-auto" />
                </div>

                <div ref={contentRef} className="grid lg:grid-cols-2 gap-16">
                    {/* Left Column - Introduction */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-light text-foreground">
                            Let&apos;s build something useful
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            If you need an engineer who can shape product
                            direction and ship production code, send me a note
                            with what you&apos;re building.
                        </p>
                        <p className="text-muted-foreground/70 leading-relaxed">
                            I&apos;m especially interested in AI products,
                            developer tooling, and systems that need both
                            strong UX and strong performance.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse"></div>
                            <span className="text-sm text-muted-foreground">
                                Open to new opportunities — full-time, remote
                                or relocation
                            </span>
                        </div>
                    </div>

                    {/* Right Column - Contact Details */}
                    <div className="space-y-10 lg:border-l lg:border-border lg:pl-16">
                        <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
                                Email
                            </div>
                            <motion.a
                                href="mailto:khadeli@threeark.com"
                                className="text-xl text-foreground hover:text-primary transition-colors font-medium inline-block"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                khadeli@threeark.com
                            </motion.a>
                        </div>

                        <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
                                Location
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>
                                    Edmonton, AB, Canada — Mountain Time
                                    (UTC-7)
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
                                Elsewhere
                            </div>
                            <div className="flex flex-wrap gap-x-8 gap-y-3">
                                {socialLinks.map((social) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                                        >
                                            <IconComponent className="w-4 h-4" />
                                            <span className="text-sm">
                                                {social.label}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-12 border-t border-border text-center">
                    <p className="text-muted-foreground leading-relaxed">
                        © 2025 Abdullah Khadeli.
                    </p>
                </div>
            </div>
        </section>
    );
}
