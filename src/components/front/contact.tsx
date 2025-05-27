"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  Send,
  Calendar,
  Clock,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

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

  const contactInfo = [
    {
      label: "Email",
      value: "khadeliabdullah@gmail.com",
      link: "mailto:khadeliabdullah@gmail.com",
      icon: Mail,
      description: "Best way to reach me",
    },
    {
      label: "Phone",
      value: "+1 (780) 974-9897",
      link: "tel:+17809749897",
      icon: Phone,
      description: "Available during business hours",
    },
    {
      label: "Location",
      value: "Edmonton, AB, Canada",
      link: "https://maps.google.com/?q=Edmonton,AB,Canada",
      icon: MapPin,
      description: "Mountain Time Zone (UTC-7)",
    },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/akhadeli",
      icon: Linkedin,
      description: "Professional network",
    },
    {
      label: "GitHub",
      url: "https://github.com/akhadeli",
      icon: Github,
      description: "Code repositories",
    },
    {
      label: "Website",
      url: "https://akhadeli.com",
      icon: ExternalLink,
      description: "Portfolio & blog",
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 pb-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-8">
          <motion.h2
            className="text-lg md:text-xl font-light tracking-[0.3em] text-muted-foreground uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Contact
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-border mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-light text-foreground mb-6">
                Let's Build Something{" "}
                <span className="text-primary animate-pulse">Amazing</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Ready to bring your next big idea to life? Whether you're
                looking for a technical leader, AI engineer, or founding team
                member, I'd love to hear about your vision and explore how we
                can work together.
              </p>
              <p className="text-muted-foreground/70 leading-relaxed">
                I'm particularly interested in projects involving AI/ML,
                performance optimization, team leadership, and innovative user
                experiences. Let's discuss how my expertise can help drive your
                project forward.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-12">
            {/* Social Links */}
            <div>
              <h4 className="text-foreground font-medium mb-8 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-primary" />
                Connect Online
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card/30 rounded-xl p-6 border border-border hover:border-primary/20 transition-all duration-300 text-center group"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors duration-300">
                        <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </div>
                      <div className="text-foreground font-medium mb-1">
                        {social.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {social.description}
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Availability Status */}
        <motion.div
          className="bg-card/30 rounded-xl p-6 border border-border hover:border-primary/20 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-muted-foreground font-medium">
              Available for New Opportunities
            </span>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Graduating June 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Open to full-time positions</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Remote or Edmonton-based</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <div>
          <h4 className="text-foreground font-medium mb-8 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Get In Touch
          </h4>
          <div className="grid gap-4 w-full grid-cols-3">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={info.label}
                  className="bg-card/30 rounded-xl p-6 border border-border hover:border-primary/20 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground/70 uppercase tracking-wide mb-1">
                        {info.label}
                      </div>
                      <motion.a
                        href={info.link}
                        target={
                          info.link.startsWith("http") ? "_blank" : "_self"
                        }
                        className="text-foreground hover:text-primary transition-colors font-medium block mb-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {info.value}
                      </motion.a>
                      <div className="text-xs text-muted-foreground">
                        {info.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-4 pt-16 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-muted-foreground mb-4 leading-relaxed">
            © 2025 Abdullah Khadeli.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
