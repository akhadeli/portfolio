"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  Star,
  Users,
  Zap,
  Eye,
  Code,
  Smartphone,
  Brain,
  Database,
  Clock,
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
    icon: React.ComponentType<{ className?: string }>;
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
      { label: "Timeline", value: "Sep-Dec 2024", icon: Clock },
      { label: "Platforms", value: "iOS & Android", icon: Smartphone },
      { label: "Type", value: "MVP Delivery", icon: Star },
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
        src: "/images/For-You-Feed.png",
        alt: "Nexusix For You Feed",
        title: "For You Feed",
      },
      {
        src: "/images/Profile.png",
        alt: "Nexusix Profile View",
        title: "Profile View",
      },
      {
        src: "/images/Share.png",
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
      { label: "Extraction", value: "2.3x Faster", icon: Zap },
      { label: "Keypoints", value: "+29%", icon: Star },
      { label: "Noise", value: "-40%", icon: Eye },
    ],
    features: [
      "Custom BRISK-SIFT extraction",
      "Advanced outlier removal",
      "CUDA acceleration",
      "Improved mesh accuracy",
    ],
    links: {
      github: "https://github.com/roddylan/SFM-to-Mesh",
      paper:
        "https://github.com/roddylan/SFM-to-Mesh/blob/main/report/report.pdf",
    },
    category: "Computer Vision",
    status: "Research",
    image_gallery: [
      {
        src: "/images/report-page-1.png",
        alt: "SFM-MVS Research Report",
        title: "Research Report",
      },
    ],
  },
] as const;

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
          start: "top 80%",
          end: "bottom 20%",
        },
      }
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
            end: "bottom 20%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen py-24 px-6 relative z-0"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.h2
            className="text-lg md:text-xl font-light tracking-[0.3em] text-zinc-300 uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Projects
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-zinc-600 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        {/* Projects List */}
        <div ref={projectsRef} className="space-y-32">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                className="project-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Project Content */}
                  {project.category === "Computer Vision" ? (
                    <>
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
                                project.status === "Delivered"
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
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {project.metrics.map((metric, metricIndex) => {
                            const IconComponent = metric.icon;
                            return (
                              <motion.div
                                key={metricIndex}
                                className="bg-card/30 rounded-xl p-4 border border-border text-center group hover:border-primary/20 transition-all duration-300"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.6,
                                  delay: index * 0.1 + metricIndex * 0.05,
                                }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/10 transition-colors duration-300">
                                  <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                </div>
                                <div className="text-foreground font-medium text-sm mb-1">
                                  {metric.value}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {metric.label}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                          <h4 className="text-foreground font-medium mb-4 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Key Features
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {project.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.1 + featureIndex * 0.05,
                                }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-muted"></div>
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="mb-8">
                          <h4 className="text-foreground font-medium mb-4 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, techIndex) => {
                              const TechIcon = tech.icon;
                              return (
                                <motion.div
                                  key={tech.name}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card/30 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: index * 0.1 + techIndex * 0.03,
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <TechIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                  <span className="text-sm text-muted-foreground">
                                    {tech.name}
                                  </span>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex gap-4">
                          {project.links.github && (
                            <motion.a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card/30 hover:bg-primary/5 hover:border-primary/20 text-foreground transition-all duration-300"
                              whileHover={{ y: -2 }}
                              transition={{ duration: 0.2 }}
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
                              transition={{ duration: 0.2 }}
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                View Paper
                              </span>
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Image Gallery for Computer Vision */}
                      {project.image_gallery.length > 0 && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="relative w-full max-w-[600px] aspect-[8.5/11] rounded-xl overflow-hidden shadow-2xl">
                            <Image
                              src={project.image_gallery[0].src}
                              alt={project.image_gallery[0].alt}
                              fill
                              className="object-cover"
                              priority
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Image Gallery for Mobile App */}
                      {project.image_gallery.length > 0 && (
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
                                        priority={index === 0}
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
                                project.status === "Delivered"
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
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {project.metrics.map((metric, metricIndex) => {
                            const IconComponent = metric.icon;
                            return (
                              <motion.div
                                key={metricIndex}
                                className="bg-card/30 rounded-xl p-4 border border-border text-center group hover:border-primary/20 transition-all duration-300"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.6,
                                  delay: index * 0.1 + metricIndex * 0.05,
                                }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/10 transition-colors duration-300">
                                  <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                </div>
                                <div className="text-foreground font-medium text-sm mb-1">
                                  {metric.value}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {metric.label}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                          <h4 className="text-foreground font-medium mb-4 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Key Features
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {project.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.1 + featureIndex * 0.05,
                                }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-muted"></div>
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="mb-8">
                          <h4 className="text-foreground font-medium mb-4 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, techIndex) => {
                              const TechIcon = tech.icon;
                              return (
                                <motion.div
                                  key={tech.name}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card/30 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: index * 0.1 + techIndex * 0.03,
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <TechIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                  <span className="text-sm text-muted-foreground">
                                    {tech.name}
                                  </span>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex gap-4">
                          {project.links.github && (
                            <motion.a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card/30 hover:bg-primary/5 hover:border-primary/20 text-foreground transition-all duration-300"
                              whileHover={{ y: -2 }}
                              transition={{ duration: 0.2 }}
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
                              transition={{ duration: 0.2 }}
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                View Paper
                              </span>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-24 pt-16 border-t border-border text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-card/30 rounded-2xl p-12 border border-border hover:border-primary/20 transition-all duration-300">
            <h4 className="text-2xl font-light text-foreground mb-4">
              Ready to Build Something Amazing?
            </h4>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              From enterprise AI platforms to cutting-edge computer vision
              research, I specialize in building scalable, high-performance
              solutions that drive real business impact. Let's discuss how we
              can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:khadeliabdullah@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span>Start a Project</span>
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
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
