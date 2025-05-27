"use client";

import { type ForwardRefExoticComponent, useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Icon,
  Code,
  Cloud,
  Database,
  Cpu,
  Layers,
  Zap,
  Brain,
  Network,
  Eye,
  Boxes,
  MessageSquare,
  FileText,
  Workflow,
  CheckCircle,
  Globe,
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

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: [
      { name: "TypeScript", years: "3+" },
      { name: "JavaScript", years: "5+" },
      { name: "Python", years: "5+" },
      { name: "Golang", years: "2+" },
      { name: "C/C++", years: "4+" },
      { name: "CUDA", years: "2+" },
      { name: "Java", years: "3+" },
      { name: "SQL", years: "3+" },
    ],
  },
  {
    title: "Frontend & Mobile",
    icon: Layers,
    skills: [
      { name: "Next.js", years: "3+" },
      { name: "React", years: "4+" },
      { name: "React Native", years: "2+" },
      { name: "Expo", years: "2+" },
    ],
  },
  {
    title: "Backend & APIs",
    icon: Database,
    skills: [
      { name: "Django", years: "2+" },
      { name: "Flask/Quart", years: "2+" },
      { name: "FastAPI", years: "1+" },
      { name: "Express", years: "3+" },
      { name: "REST", years: "4+" },
      { name: "gRPC", years: "1+" },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "LangChain", years: "2+" },
      { name: "Vercel AI SDK", years: "1+" },
      { name: "PyTorch", years: "2+" },
      { name: "TensorFlow", years: "2+" },
      { name: "CoreGraph", years: "1+" },
    ],
  },
  {
    title: "Computer Vision & 3D",
    icon: Eye,
    skills: [
      { name: "OpenCV", years: "3+" },
      { name: "COLMAP", years: "2+" },
      { name: "ORB-SLAM", years: "2+" },
      { name: "Gaussian Splatting", years: "2+" },
      { name: "NeRF", years: "2+" },
      { name: "ROS", years: "1+" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      { name: "Azure", years: "2+" },
      { name: "AWS", years: "2+" },
      { name: "Google Cloud", years: "1+" },
      { name: "Docker", years: "3+" },
      { name: "Kubernetes", years: "2+" },
      { name: "CI/CD", years: "2+" },
    ],
  },
  {
    title: "Databases & Tools",
    icon: Database,
    skills: [
      { name: "Firebase", years: "3+" },
      { name: "Supabase", years: "2+" },
      { name: "PostgreSQL", years: "3+" },
      { name: "Elasticsearch", years: "2+" },
      { name: "Git", years: "4+" },
      { name: "Linux", years: "3+" },
      { name: "Vitest/Jest", years: "2+" },
    ],
  },
  {
    title: "Architecture & Methodologies",
    icon: Workflow,
    skills: [
      { name: "Microservices", years: "2+" },
      { name: "Pub/Sub", years: "2+" },
      { name: "MVC", years: "3+" },
      { name: "Jira", years: "3+" },
      { name: "Scrum", years: "3+" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

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

    // Skills animation
    if (skillsRef.current) {
      const categories = skillsRef.current.querySelectorAll(".skill-category");
      gsap.fromTo(
        categories,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.h2
            className="text-lg md:text-xl font-light tracking-[0.3em] text-muted-foreground uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Skills
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-border mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef} className="space-y-16">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.title}
                className="skill-category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.skills.length} Technologies
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const iconData =
                      techIcons[skill.name as keyof typeof techIcons];

                    return (
                      <motion.div
                        key={skill.name}
                        className="bg-card/30 rounded-xl p-4 border border-border hover:border-primary/20 transition-all duration-300 group"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {iconData ? (
                            <div className="w-8 h-8 flex items-center justify-center group-hover:text-primary transition-colors duration-300">
                              {"path" in iconData ? (
                                // Simple-icons SVG
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                                >
                                  <path d={iconData.path} />
                                </svg>
                              ) : (
                                // Lucide React component
                                React.createElement(iconData, {
                                  className:
                                    "w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300",
                                })
                              )}
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-muted rounded flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                              <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                                {skill.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="text-foreground font-medium text-sm">
                              {skill.name}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {skill.years} yrs experience
                            </span>
                          </div>
                        </div>

                        {/* Skill Badge */}
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">
                            {category.title}
                          </span>
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <motion.div
          className="mt-20 pt-16 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 max-w-6xl mx-auto mb-16">
            <div className="text-center group">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <Code className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="text-2xl md:text-3xl font-light text-foreground mb-2">
                8+
              </div>
              <div className="text-sm text-muted-foreground">
                Programming Languages
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <Layers className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="text-2xl md:text-3xl font-light text-foreground mb-2">
                25+
              </div>
              <div className="text-sm text-muted-foreground">
                Frameworks & Tools
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <Brain className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="text-2xl md:text-3xl font-light text-foreground mb-2">
                10+
              </div>
              <div className="text-sm text-muted-foreground">
                AI & ML Technologies
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <Cloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="text-2xl md:text-3xl font-light text-foreground mb-2">
                3
              </div>
              <div className="text-sm text-muted-foreground">
                Cloud Platforms
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <Eye className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="text-2xl md:text-3xl font-light text-foreground mb-2">
                6
              </div>
              <div className="text-sm text-muted-foreground">
                Computer Vision
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <Database className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="text-2xl md:text-3xl font-light text-foreground mb-2">
                8
              </div>
              <div className="text-sm text-muted-foreground">
                Databases & Tools
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <Zap className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="text-2xl md:text-3xl font-light text-foreground mb-2">
                5+
              </div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center">
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-base">
              Full-stack expertise spanning AI/ML, computer vision, cloud
              infrastructure, and modern web technologies. Specialized in
              building scalable enterprise platforms with cutting-edge AI
              integration and performance optimization.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
