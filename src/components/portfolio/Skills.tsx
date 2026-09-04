"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LOCAL_SKILLS, SKILL_CATEGORIES } from "@/data/portfolio-data";
import TechIcon from "@/components/icons/TechIcon";
import { cn } from "@/lib/utils";

function levelLabel(s: number) {
  if (s >= 90) return "Expert";
  if (s >= 80) return "Advanced";
  if (s >= 70) return "Proficient";
  return "Familiar";
}

const TABS = ["All", ...SKILL_CATEGORIES] as const;

export default function Skills() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: LOCAL_SKILLS.length };
    for (const c of SKILL_CATEGORIES) map[c] = LOCAL_SKILLS.filter((s) => s.category === c).length;
    return map;
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LOCAL_SKILLS.filter(
      (s) =>
        (tab === "All" || s.category === tab) &&
        (!q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)),
    );
  }, [tab, query]);

  const top = LOCAL_SKILLS.reduce((a, b) => (b.strength > a.strength ? b : a));
  const expertCount = LOCAL_SKILLS.filter((s) => s.strength >= 90).length;

  return (
    <div className="w-full px-6 lg:px-16">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="section-label mb-4">Skills</p>
        <h2 className="text-5xl lg:text-6xl font-bold">
          Tools of the <span className="italic gradient-text">trade.</span>
        </h2>
        <p className="text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">
          27 technologies across 5 domains — every mark below is the real thing,
          battle-tested in production projects and hackathons.
        </p>
      </motion.div>

      {/* ── Controls: search + category tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10 font-ui"
      >
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search technologies…"
            className="pl-8.5 pr-8 text-sm bg-card/50 border-border/55 h-9 rounded-md focus:border-primary/40"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative px-3.5 py-1.5 text-[12px] font-medium rounded-full border transition-all duration-200",
                  active
                    ? "border-transparent text-primary-foreground"
                    : "border-border/55 text-muted-foreground hover:border-border hover:text-foreground bg-transparent",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="skillTab"
                    className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/20"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  {t}
                  <span className={cn("text-[10px] font-mono", active ? "opacity-70" : "opacity-50")}>
                    {counts[t] ?? 0}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Square tile grid — every tool, same size ── */}
      <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        <AnimatePresence mode="popLayout">
          {visible.map((s) => (
            <motion.div
              layout
              key={s.id}
              title={`${s.name} — ${levelLabel(s.strength)} · ${s.category}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group aspect-square p-3 rounded-xl border border-border/55 bg-card/50 hover:border-primary/40 hover:bg-card/75 hover:shadow-lg hover:shadow-primary/5 transition-colors flex flex-col items-center justify-center gap-1.5 text-center"
            >
              <TechIcon
                skillId={s.id}
                skillName={s.name}
                className="w-11 h-11 shrink-0 group-hover:scale-110 transition-transform duration-200"
                imgClassName="w-6 h-6"
              />
              <h4 className="text-xs font-semibold text-foreground truncate w-full leading-tight">{s.name}</h4>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="font-ui text-center py-20 text-sm text-muted-foreground">
          No match.{" "}
          <button
            onClick={() => {
              setQuery("");
              setTab("All");
            }}
            className="text-primary hover:underline"
          >
            Reset filters
          </button>
        </p>
      )}

      {/* ── Summary strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/50 border border-border/50 rounded-xl overflow-hidden font-ui"
      >
        {[
          { value: String(LOCAL_SKILLS.length), label: "Technologies" },
          { value: String(expertCount), label: "Expert-Level" },
          { value: top.name, label: "Strongest" },
          { value: String(SKILL_CATEGORIES.length), label: "Domains" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center justify-center py-7 gap-1.5 bg-card/60 px-2">
            <span
              className="text-xl lg:text-2xl font-bold gradient-text text-center leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {value}
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
