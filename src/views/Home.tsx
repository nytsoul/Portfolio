"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink, Github, Star, GitFork } from "lucide-react";
import Hero from "@/components/portfolio/Hero";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";
import SectionHeading from "@/components/motion/SectionHeading";
import { useProfile, useGitHubStats, useProjects } from "@/hooks/use-api";
import { useFallbackProfile, useFallbackGitHubStats } from "@/hooks/use-fallback-profile";
import { CURATED_PROJECTS } from "@/data/project-config";
import { EXPERTISE } from "@/data/portfolio-data";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });
const SectionScene = dynamic(() => import("@/components/3d/SectionScene"), { ssr: false });

const MARQUEE = ["Full-Stack", "AI Systems", "Cybersecurity", "Competitive Programming", "Product Design", "Open Source"];

export default function Home() {
  const { data: dbProfile } = useProfile();
  const { data: dbGithubStats } = useGitHubStats();
  const { data: featured } = useProjects({ featured: true }) as { data: any[] | undefined };
  const profile = useFallbackProfile(dbProfile);
  const githubStats = useFallbackGitHubStats(dbGithubStats);
  const top = (featured ?? []).slice(0, 3);

  const numbers = [
    { value: Number(githubStats?.publicRepos ?? 0), suffix: "", label: "Public Repositories" },
    { value: Number(githubStats?.totalStars ?? 0), suffix: "", label: "GitHub Stars Earned" },
    { value: CURATED_PROJECTS.length, suffix: "", label: "Production Projects" },
    { value: 50, suffix: "+", label: "CP Problems Solved" },
  ];

  return (
    <div>
      {/* Hero with 3D */}
      <section className="relative overflow-hidden">
        <Suspense fallback={null}>
          <HeroScene className="absolute inset-x-0 top-0 h-[300px] sm:h-[360px] lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[55%] lg:h-full opacity-40 sm:opacity-50 lg:opacity-90 [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] lg:[mask-image:none]" />
        </Suspense>
        <div className="relative z-10">
          <Hero profile={profile} githubStats={githubStats} />
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-border/40 bg-card/20 overflow-hidden py-4 relative">
        <div className="flex w-max animate-marquee gap-10 font-ui text-[12px] tracking-[0.22em] uppercase text-muted-foreground/70">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m} <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Numbers strip */}
      <section className="page-container pt-20 lg:pt-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {numbers.map(({ value, suffix, label }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="group bg-card border border-border/50 rounded-xl p-6 text-center hover:border-primary/40 transition-all">
                <CountUp
                  to={value}
                  suffix={suffix}
                  className="block text-4xl font-bold gradient-text"
                />
                <div className="font-ui text-[11px] tracking-[0.15em] uppercase text-muted-foreground/60 mt-2">
                  {label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="page-container py-24 lg:py-32 relative">
        <Suspense fallback={null}>
          <SectionScene variant="gold" className="absolute -right-10 top-10 w-[280px] h-[280px] opacity-60" />
        </Suspense>
        <div className="relative">
          <SectionHeading
            label="Selected Work"
            title={<>Flagship <span className="italic gradient-text">builds.</span></>}
            sub="Production systems with live deployments — designed, engineered, and shipped end to end."
          />
          <div className="flex justify-end -mt-6 mb-8">
            <Magnetic strength={0.3}>
              <Link href="/work" className="font-ui flex items-center gap-2 text-sm text-primary hover:opacity-80">
                All projects <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {top.map((p: any, i: number) => (
              <Reveal key={p._id ?? i} delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group h-full bg-card border border-border/55 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-background/60">
                    <img
                      src={p.image || "/images/project-web.png"}
                      alt={`${p.name} preview`}
                      loading="lazy"
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (!t.src.endsWith("/images/project-web.png")) t.src = "/images/project-web.png";
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    {p.homepage && (
                      <span className="absolute top-3 right-3 font-ui flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-background/80 backdrop-blur border border-border/50 text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-chart-3 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
              <div className="p-4 md:p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                        className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {p.name}
                      </h3>
                      <div className="font-ui flex items-center gap-2.5 text-[11px] text-muted-foreground shrink-0 mt-1">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3" />{p.stars}</span>
                        <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{p.forks}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                    <div className="font-ui flex items-center gap-4">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                      {p.homepage && (
                        <a
                          href={p.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[12px] font-medium text-primary hover:opacity-75 transition-opacity"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}
                      <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
            {top.length === 0 && (
              <p className="font-ui text-sm text-muted-foreground">Loading flagship builds from GitHub…</p>
            )}
          </div>
        </div>
      </section>

      {/* Expertise preview */}
      <section className="page-container pb-24 lg:pb-32 relative">
        <Suspense fallback={null}>
          <SectionScene variant="teal" className="absolute -left-10 bottom-0 w-[260px] h-[260px] opacity-50" />
        </Suspense>
        <div className="relative">
          <SectionHeading
            label="Expertise"
            title={<>Three disciplines, <span className="italic gradient-text">one builder.</span></>}
          />
          <div className="grid md:grid-cols-3 gap-4">
            {EXPERTISE.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <Link
                  href="/about"
                  className="group block h-full p-6 bg-card border border-border/50 rounded-xl hover:border-primary/35 transition-all"
                >
                  <div className="font-mono text-xs text-primary/70 mb-3">0{i + 1}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {e.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{e.description}</p>
                  <div className="font-ui flex flex-wrap gap-1.5">
                    {e.tags.map((t: string) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-background/60 border border-border/40 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-container pb-24 lg:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-card/80 via-card/50 to-background p-8 lg:p-14">
            <div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, oklch(0.78 0.12 75 / 0.12) 0%, transparent 65%)" }}
            />
            <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
              <h2 className="text-display-sm flex-1">Have an idea? Let's engineer it into existence.</h2>
              <div className="font-ui flex flex-wrap gap-3">
                <Magnetic strength={0.3}>
                  <Link href="/work" className="px-7 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/20">
                    View My Work <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Link href="/contact" className="px-7 py-3 text-sm font-medium border border-border/70 rounded-lg hover:bg-accent/40 transition-colors">
                    Get in Touch
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
