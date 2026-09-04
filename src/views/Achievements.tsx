"use client";

import { motion } from "framer-motion";
import { Trophy, Star, GitFork, Users, Award, Sparkles } from "lucide-react";
import Link from "next/link";
import { ACHIEVEMENTS } from "@/data/portfolio-data";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";
import { useAchievements } from "@/hooks/use-api";

export default function Achievements() {
  const { data: dynamic } = useAchievements() as { data: any[] | undefined };
  const [head, ...rest] = ACHIEVEMENTS;

  return (
    <div className="page-container py-24 lg:py-32">
      <Reveal className="mb-14">
        <p className="section-label mb-4">Achievements</p>
        <h1 className="text-display-lg">
          Receipts, not <span className="italic gradient-text">promises.</span>
        </h1>
        <p className="text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">
          Hackathon finals, shipped products, and live GitHub impact — every number verifiable.
        </p>
      </Reveal>

      {/* ── Bento: headline + supporting ── */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {head && (
          <Reveal className="md:col-span-2" delay={0}>
            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden h-full p-8 lg:p-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/60 to-card/30"
            >
              <div
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, oklch(0.78 0.12 75 / 0.18) 0%, transparent 65%)" }}
              />
              <div className="font-ui inline-flex items-center gap-2 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/25 uppercase tracking-wider mb-5">
                <Sparkles className="w-3 h-3" /> {head.year} · {head.category}
              </div>
              <div className="block text-5xl lg:text-6xl font-bold gradient-text mb-3">
                {head.value}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {head.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{head.description}</p>
            </motion.div>
          </Reveal>
        )}
        <div className="grid gap-4">
          {rest.slice(0, 2).map((a, i) => (
            <Reveal key={a.id} delay={0.08 * (i + 1)}>
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="h-full p-6 bg-card/50 border border-border/55 rounded-2xl hover:border-primary/35 active:border-primary/50 transition-all"
              >
                <Trophy className="w-4 h-4 text-chart-1 mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <CountUp to={parseInt(a.value) || 0} suffix={a.value.replace(/[0-9]/g, "")} />
                </div>
                <h3 className="text-[15px] font-semibold">{a.title}</h3>
                <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{a.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {rest.slice(2).map((a) => (
        <Reveal key={a.id} className="mb-6">
          <div className="p-6 bg-card/40 border border-border/50 rounded-2xl flex flex-wrap items-center gap-4">
            <Trophy className="w-5 h-5 text-chart-1 shrink-0" />
            <div className="text-2xl font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
              <CountUp to={parseInt(a.value) || 0} suffix={a.value.replace(/[0-9]/g, "")} />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold">{a.title}</h3>
              <p className="text-[13px] text-muted-foreground">{a.description}</p>
            </div>
          </div>
        </Reveal>
      ))}

      {/* ── Live GitHub impact ── */}
      <Reveal className="mt-16 mb-8">
        <p className="section-label mb-2">Live GitHub Impact</p>
      </Reveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {(dynamic ?? []).map((d: any, i: number) => {
          const n = parseInt(String(d.value));
          const suffix = String(d.value).replace(/[0-9]/g, "");
          return (
            <Reveal key={d._id} delay={i * 0.07}>
              <div className="bg-card/50 border border-border/55 rounded-xl p-6 text-center hover:border-primary/35 hover:-translate-y-1 active:scale-[0.98] transition-all h-full">
                <div className="text-2xl mb-2">{d.icon}</div>
                <div className="text-2xl font-bold text-foreground">
                  {Number.isNaN(n) ? d.value : <CountUp to={n} suffix={suffix} />}
                </div>
                <div className="font-ui text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{d.title}</div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 font-ui text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Smart India Hackathon Finalist · 50+ CP problems · 6 shipped projects
          </span>
          <Magnetic strength={0.3} className="sm:ml-auto">
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80">
              See the work behind the numbers <Star className="w-3.5 h-3.5" />
            </Link>
          </Magnetic>
          <span className="hidden lg:flex items-center gap-3 text-[11px]">
            <Star className="w-3 h-3" /> stars <GitFork className="w-3 h-3" /> forks <Users className="w-3 h-3" /> followers
          </span>
        </div>
      </Reveal>
    </div>
  );
}
