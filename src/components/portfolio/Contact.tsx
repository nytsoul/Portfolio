"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Code, Code2, ExternalLink, ArrowUpRight, MapPin } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Magnetic from "@/components/motion/Magnetic";
import { env } from "@/lib/env";

interface ContactProps {
  profile: any;
}

export default function Contact({ profile }: ContactProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile?.email || "neshun7413@gmail.com",
      href: `mailto:${profile?.email || "neshun7413@gmail.com"}`,
      note: "Best for project inquiries",
    },
    {
      icon: Github,
      label: "GitHub",
      value: `github.com/${profile?.github || "nytsoul"}`,
      href: `https://github.com/${profile?.github || "nytsoul"}`,
      note: "Open-source work",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect professionally",
      href: profile?.linkedin || "",
      note: "Professional networking",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@nyt__soul",
      href: profile?.instagram || "https://instagram.com/nyt__soul",
      note: "Personal updates",
    },
    {
      icon: Code,
      label: "Codeforces",
      value: env.competitive.codeforces.username || "nyt__soul",
      href: `https://codeforces.com/profile/${env.competitive.codeforces.username || "nyt__soul"}`,
      note: "Competitive programming",
    },
    {
      icon: Code2,
      label: "LeetCode",
      value: env.competitive.leetcode.username || "nyt__soul",
      href: `https://leetcode.com/${env.competitive.leetcode.username || "nyt__soul"}`,
      note: "Algorithm practice",
    },
  ].filter((m) => m.href);

  return (
    <div className="w-full px-6 lg:px-16" ref={ref}>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="section-label mb-4">Contact</p>
        <h2 className="text-5xl lg:text-6xl font-bold">
          Let's work{" "}
          <span className="italic gradient-text">together.</span>
        </h2>
        <p className="text-base text-muted-foreground mt-4 max-w-md leading-relaxed">
          I'm actively seeking internships and collaborative opportunities. If you have an idea, a question, or just want to connect — reach out.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-10 xl:gap-16">
        {/* Contact methods */}
        <div className="space-y-2.5 font-ui">
          {contactMethods.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.a
                key={i}
                href={m.href}
                target={m.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                whileHover={{ x: 3 }}
                className="group flex items-center gap-4 px-5 py-4 rounded-lg border border-border/50 bg-card/40 hover:border-primary/35 hover:bg-card/70 transition-all duration-200"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-md bg-background/60 border border-border/50 shrink-0 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground/55 mb-0.5">{m.label}</div>
                  <div className="text-sm font-medium text-foreground truncate">{m.value}</div>
                  <div className="text-[11px] text-muted-foreground/50">{m.note}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 shrink-0 transition-opacity" />
              </motion.a>
            );
          })}
        </div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="lg:sticky lg:top-24 self-start"
        >
          <div className="rounded-xl border border-border/55 bg-card/50 p-7">
            {/* Decorative serif monogram */}
            <div
              className="text-4xl font-bold italic text-primary/20 leading-none mb-5 select-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              NR.
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to build something great?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Whether it's a collaboration, internship, or freelance engagement — I'm available and responsive.
            </p>
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${profile?.email || "neshun7413@gmail.com"}`}
                className="font-ui flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                <Mail className="w-4 h-4" />
                Send a Message
              </a>
            </Magnetic>

            {profile?.location && (
              <div className="font-ui flex items-center gap-1.5 text-xs text-muted-foreground/60 mt-5">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
