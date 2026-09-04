"use client";

import { motion } from "framer-motion";
import { Github, Mail, Linkedin, MapPin, ArrowDown, Instagram } from "lucide-react";
import { useRouter } from "next/navigation";
import TypeWriter from "./TypeWriter";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";
import { CURATED_PROJECTS } from "@/data/project-config";

interface HeroProps {
  profile: any;
  githubStats: any;
}

export default function Hero({ profile, githubStats }: HeroProps) {
  const router = useRouter();
  const stats = [
    { label: "Repositories", value: Number(githubStats?.publicRepos ?? 0), suffix: "" },
    { label: "GitHub Stars", value: Number(githubStats?.totalStars ?? 0), suffix: "" },
    { label: "CP Problems", value: 50, suffix: "+" },
    { label: "Projects Built", value: CURATED_PROJECTS.length, suffix: "" },
  ];

  const goSectionOrRoute = (id: string, route: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else router.push(route);
  };

  const socialLinks = [
    profile?.github && { icon: Github, href: `https://github.com/${profile.github}`, label: "GitHub" },
    profile?.email && { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
    profile?.linkedin && { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    profile?.instagram && { icon: Instagram, href: profile.instagram, label: "Instagram" },
  ].filter(Boolean) as { icon: any; href: string; label: string }[];


  return (
    <div className="relative min-h-screen flex flex-col justify-center">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 15% 30%, oklch(0.78 0.12 75 / 0.06) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 50% at 85% 70%, oklch(0.72 0.10 200 / 0.04) 0%, transparent 60%)",
        }}
      />
      {/* Fine grain noise grid */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.55 0.01 80 / 0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="w-full px-6 lg:px-16 pt-24 pb-16">
        {/* Main hero grid */}
        <div className="max-w-3xl min-h-[calc(100vh-12rem)] flex flex-col justify-center">

          {/* ── Left: Text ── */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-ui inline-flex items-center gap-2 mb-8 px-3 py-1.5 border border-border/50 bg-card/80 max-md:bg-card rounded-full text-xs text-muted-foreground lg:backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-chart-3 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-chart-3" />
              </span>
              Open to internships &amp; collaborations
            </motion.div>

            {/* Name — staggered letter rise */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[1.0] mb-6" aria-label="Neshun">
                {"Neshun".split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    initial={{ opacity: 0, y: 48, rotate: 4 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block gradient-text"
                  >
                    {ch}
                  </motion.span>
                ))}
              </h1>
            </motion.div>


            {/* Location */}
            {profile?.location && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-ui flex items-center gap-1.5 mb-6 text-xs tracking-wide text-muted-foreground/70"
              >
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </motion.div>
            )}

            {/* Typewriter — source serif */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="min-h-[32px] mb-6"
            >
              <TypeWriter
                texts={[
                  "Full-Stack Developer & AI Enthusiast",
                  "Cybersecurity Researcher",
                  "Competitive Programmer",
                  "CS Engineering @ SSN College",
                  "\"Consistency beats motivation.\"",
                ]}
                typingSpeed={42}
                deletingSpeed={22}
                pauseDuration={3000}
                className="text-base text-muted-foreground italic"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base text-muted-foreground leading-relaxed max-w-[480px] mb-8"
            >
              {profile?.bio ??
                "3rd-year CS Engineering student at SSN College of Engineering, Chennai — building robust, scalable systems with a focus on clean architecture and exceptional user experiences."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-ui flex flex-wrap items-center gap-3 mb-8"
            >
              <Magnetic strength={0.25}>
                <button
                  onClick={() => goSectionOrRoute("projects", "/work")}
                  className="px-7 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                >
                  View Projects
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={() => goSectionOrRoute("contact", "/contact")}
                  className="px-7 py-3 text-sm font-medium border border-border/70 text-foreground/80 rounded-lg hover:bg-accent/40 hover:text-foreground hover:border-primary/40 transition-all"
                >
                  Get in Touch
                </button>
              </Magnetic>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded border border-border/50 bg-card/40 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>

        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-16 font-ui"
        >
          {stats.map(({ label, value, suffix }) => (
            <motion.div
              key={label}
              whileHover={{ y: -3 }}
              className="bg-card border border-border/60 rounded-xl p-4 text-center hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <CountUp
                to={value}
                suffix={suffix}
                className="block text-2xl font-bold text-foreground mb-0.5"
              />
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-center pt-4 pb-2"
        >
          <motion.button
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="font-ui flex flex-col items-center gap-2 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
