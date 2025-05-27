"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Building2,
  Calendar,
  MapPin,
  TrendingUp,
  Users,
  Award,
  Zap,
} from "lucide-react";

const experiences = [
  {
    company: "TENN.ai (KAIC.ai)",
    role: "Lead AI/UI Engineer",
    period: "Aug 2024 - Present",
    duration: "9+ months",
    location: "Remote",
    type: "Full-time",
    logo: "🤖",
    description:
      "Leading a team of engineers in developing cutting-edge AI-powered platforms, achieving remarkable performance improvements and recognition.",
    achievements: [
      {
        title: "Performance Engineering",
        description:
          "Optimized platform architecture achieving 4x load time improvements",
        icon: Zap,
        metric: "Performance",
      },
      {
        title: "Team Leadership",
        description: "Led engineering team through product development cycles",
        icon: Users,
        metric: "Leadership",
      },
      {
        title: "Product Showcase",
        description:
          "Presented AI platform at Web Summit Doha to global audience",
        icon: Award,
        metric: "Global recognition",
      },
      {
        title: "Growth Metrics",
        description: "Delivered features that drove brand visibility",
        icon: TrendingUp,
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
    location: "Remote",
    type: "Full-time",
    logo: "🎓",
    description:
      "Building an innovative EdTech platform from the ground up, serving users across the globe with custom AI orchestration and cloud infrastructure.",
    achievements: [
      {
        title: "Platform Scale",
        description:
          "Built EdTech platform from scratch, now serving users across the globe",
        icon: Users,
        metric: "Global users",
      },
      {
        title: "AI Architecture",
        description:
          "Developed custom LLM orchestration library with improved performance and easier orchestration",
        icon: Zap,
        metric: "Performance",
      },
      {
        title: "Cloud Infrastructure",
        description:
          "Deployed Azure Kubernetes clusters reducing deployment time",
        icon: TrendingUp,
        metric: "DevOps",
      },
      {
        title: "Founding Impact",
        description:
          "Core founding engineer responsible for technical architecture decisions",
        icon: Award,
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
    logo: "💼",
    description:
      "Developed high-performance analytics interfaces and optimization solutions for large-scale data processing in the Fintech sector.",
    achievements: [
      {
        title: "Analytics Optimization",
        description:
          "Built analytics interface reducing report generation from 72 hours to <2 minutes",
        icon: Zap,
        metric: "72h → <2min",
      },
      {
        title: "Data Pipeline",
        description:
          "Optimized processing pipeline handling 15,000+ daily records with 12% speed improvement",
        icon: TrendingUp,
        metric: "12% faster",
      },
      {
        title: "Visualization Systems",
        description:
          "Designed and implemented real-time data visualization dashboards",
        icon: Award,
        metric: "Real-time",
      },
      {
        title: "Fintech Integration",
        description:
          "Worked with financial data systems and compliance requirements",
        icon: Users,
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
          start: "top 80%",
          end: "bottom 20%",
        },
      }
    );

    // Experience cards animation
    if (experiencesRef.current) {
      const cards = experiencesRef.current.querySelectorAll(".experience-item");
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
            trigger: experiencesRef.current,
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
      id="experience"
      className="min-h-screen py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.h2
            className="text-lg md:text-xl font-light tracking-[0.3em] text-muted-foreground uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Experience
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-border mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        {/* Experience Timeline */}
        <div ref={experiencesRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-border h-full hidden lg:block"></div>

          <div className="space-y-20">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.company}
                  className="experience-item relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary/20 rounded-full border-4 border-background z-10 hidden lg:block"></div>

                  <div
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      isEven ? "" : "lg:grid-flow-col-dense"
                    }`}
                  >
                    {/* Content */}
                    <div
                      className={`${
                        isEven ? "lg:text-right lg:pr-12" : "lg:pl-12"
                      }`}
                    >
                      {/* Company Header */}
                      <div
                        className={`flex items-center gap-4 mb-6 ${
                          isEven ? "lg:justify-end" : ""
                        }`}
                      >
                        <div className="text-4xl">{exp.logo}</div>
                        <div>
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
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div
                        className={`flex flex-wrap gap-2 ${
                          isEven ? "lg:justify-end" : ""
                        }`}
                      >
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground bg-card/30 hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements Card */}
                    <div className={`${isEven ? "lg:pl-12" : "lg:pr-12"}`}>
                      <div className="bg-card/30 rounded-2xl p-8 border border-border hover:border-primary/20 transition-all duration-300">
                        <h4 className="text-foreground font-medium mb-6 flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          Key Achievements
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {exp.achievements.map((achievement, achIndex) => {
                            const IconComponent = achievement.icon;
                            return (
                              <motion.div
                                key={achIndex}
                                className="bg-card/30 rounded-xl p-4 border border-border hover:border-primary/20 transition-all duration-300 group"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.6,
                                  delay: index * 0.1 + achIndex * 0.05,
                                }}
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                                    <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-foreground text-sm font-medium mb-1">
                                      {achievement.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground leading-relaxed">
                                      {achievement.description}
                                    </div>
                                    <div className="text-xs text-primary font-medium mt-2">
                                      {achievement.metric}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
