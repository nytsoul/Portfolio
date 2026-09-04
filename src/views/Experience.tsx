"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, FolderGit2, Code2, Trophy, ArrowRight, MapPin } from "lucide-react";
import ExperienceTimeline from "@/components/portfolio/ExperienceTimeline";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";

const SectionScene = dynamic(() => import("@/components/3d/SectionScene"), { ssr: false });

const HIGHLIGHTS = [
  { icon: Briefcase, value: 2, suffix: "+", label: "Years Building" },
  { icon: FolderGit2, value: 6, suffix: "", label: "Shipped Projects" },
  { icon: Code2, value: 50, suffix: "+", label: "CP Problems Solved" },
];

export default function Experience() {
  return (
    <div className="py-24 lg:py-32">
      {/* ── Header ── */}
      <div className="page-container mb-12 relative">
        <Suspense fallback={null}>
          <SectionScene variant="violet" className="absolute -right-8 -top-8 w-[240px] h-[240px] opacity-50" />
        </Suspense>
        <Reveal className="relative">
          <p className="section-label mb-4">Experience</p>
          <h1 className="text-display-lg">
            What I've <span className="italic gradient-text">done.</span>
          </h1>
          <p className="text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">
            3rd-year CS engineer shipping real products — from hackathon finals
            to production deployments. One timeline, no filler.
          </p>
        </Reveal>

        {/* ── Highlight strip ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10 font-ui">
          {HIGHLIGHTS.map(({ icon: Icon, value, suffix, label }, i) => (
            <Reveal key={label} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/55 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all h-full"
              >
                <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <CountUp to={value} suffix={suffix} className="block text-xl font-bold text-foreground leading-none" />
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wide mt-1">{label}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
          <Reveal delay={0.34}>
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/15 to-card/50 border border-primary/30 h-full"
            >
              <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-md bg-primary/15 border border-primary/30">
                <Trophy className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xl font-bold gradient-text leading-none">SIH</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wide mt-1">Hackathon Finalist</div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>

      {/* ── The timeline ── */}
      <div className="page-container">
        <ExperienceTimeline />
      </div>

      {/* ── Hiring CTA ── */}
      <div className="page-container mt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border/55 bg-card/50 p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6">
            <div
              className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, oklch(0.72 0.10 200 / 0.08) 0%, transparent 65%)" }}
            />
            <div className="flex-1 relative">
              <div className="font-ui inline-flex items-center gap-2 mb-3 px-3 py-1 border border-chart-3/30 bg-chart-3/10 rounded-full text-xs text-chart-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-chart-3 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-chart-3" />
                </span>
                Available now
              </div>
              <h2 className="text-display-sm">Want this trajectory on your team?</h2>
              <p className="font-ui flex items-center gap-1.5 text-xs text-muted-foreground/60 mt-3">
                <MapPin className="w-3 h-3" />
                Chennai, India · Open to remote
              </p>
            </div>
            <div className="font-ui flex flex-wrap gap-3 relative">
              <Magnetic strength={0.3}>
                <Link
                  href="/contact"
                  className="px-7 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link
                  href="/work"
                  className="px-7 py-3 text-sm font-medium border border-border/70 rounded-lg hover:bg-accent/40 transition-colors"
                >
                  See the Proof
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
