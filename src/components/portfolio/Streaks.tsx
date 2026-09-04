"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Flame, Zap, Code2, ExternalLink, RefreshCw } from "lucide-react";
import CountUp from "@/components/motion/CountUp";
import { env } from "@/lib/env";
import {
  fetchCodeforcesStreak,
  fetchLeetCodeStreak,
  githubStreakImage,
  type PlatformStreak,
} from "@/lib/streak-service";
import { cn } from "@/lib/utils";

type LoadState = { loading: boolean; error: boolean; data: PlatformStreak | null };

const idle: LoadState = { loading: true, error: false, data: null };

function usePlatformStreak(fetcher: () => Promise<PlatformStreak>) {
  const [state, setState] = useState<LoadState>(idle);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    let live = true;
    setState({ loading: true, error: false, data: null });
    fetcher()
      .then((data) => live && setState({ loading: false, error: false, data }))
      .catch(() => live && setState({ loading: false, error: true, data: null }));
    return () => {
      live = false;
    };
  }, [nonce]);
  return { ...state, retry: () => setNonce((n) => n + 1) };
}

function CardShell({
  href,
  label,
  children,
  delay = 0,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group block h-full p-6 rounded-2xl border border-border/55 bg-card/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all"
    >
      {children}
    </motion.a>
  );
}

function PlatformHead({ icon: Icon, name, handle, accent }: { icon: any; name: string; handle: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={cn("w-10 h-10 flex items-center justify-center rounded-lg border", accent)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-semibold text-foreground flex items-center gap-1.5">
          {name}
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:opacity-100 transition-all" />
        </div>
        <div className="font-ui text-xs text-muted-foreground truncate">@{handle}</div>
      </div>
    </div>
  );
}

function Skeleton() {
  return <div className="animate-pulse space-y-3">{[80, 55, 40].map((w, i) => <div key={i} className="h-6 rounded bg-white/5" style={{ width: `${w}%` }} />)}</div>;
}

function ErrorRow({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Couldn't load live streak.</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRetry();
        }}
        className="inline-flex items-center gap-1 text-primary hover:underline text-[13px] font-medium"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Retry
      </button>
    </div>
  );
}

export default function Streaks() {
  const ghUser = env.github.username;
  const cfUser = env.competitive.codeforces.username || "nyt__soul";
  const lcUser = env.competitive.leetcode.username || "nyt__soul";

  const cf = usePlatformStreak(fetchCodeforcesStreak);
  const lc = usePlatformStreak(fetchLeetCodeStreak);
  const [ghImgOk, setGhImgOk] = useState(true);

  const statCards: {
    key: string;
    name: string;
    handle: string;
    href: string;
    icon: any;
    accent: string;
    state: LoadState & { retry: () => void };
  }[] = [
    {
      key: "cf",
      name: "Codeforces",
      handle: cfUser,
      href: `https://codeforces.com/profile/${cfUser}`,
      icon: Zap,
      accent: "bg-chart-3/10 border-chart-3/25 text-chart-3",
      state: cf,
    },
    {
      key: "lc",
      name: "LeetCode",
      handle: lcUser,
      href: `https://leetcode.com/${lcUser}`,
      icon: Code2,
      accent: "bg-chart-4/10 border-chart-4/25 text-chart-4",
      state: lc,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* GitHub streak — live widget */}
      <CardShell href={`https://github.com/${ghUser}`} label="GitHub streak" delay={0}>
        <PlatformHead icon={Github} name="GitHub" handle={ghUser} accent="bg-primary/10 border-primary/25 text-primary" />
        {ghImgOk ? (
          <img
            src={githubStreakImage(ghUser)}
            alt="GitHub contribution streak"
            loading="lazy"
            onError={() => setGhImgOk(false)}
            className="w-full h-auto rounded-lg"
          />
        ) : (
          <p className="text-sm text-muted-foreground">Streak widget unavailable — view the contribution graph on GitHub.</p>
        )}
        <p className="font-ui text-[11px] text-muted-foreground/50 mt-3">Live · refreshes with every contribution</p>
      </CardShell>

      {/* Codeforces + LeetCode — computed live from APIs */}
      {statCards.map(({ key, name, handle, href, icon, accent, state }, i) => (
        <CardShell key={key} href={href} label={`${name} streak`} delay={0.08 * (i + 1)}>
          <PlatformHead icon={icon} name={name} handle={handle} accent={accent} />
          {state.loading ? (
            <Skeleton />
          ) : state.error || !state.data ? (
            <ErrorRow onRetry={state.retry} />
          ) : state.data.streakAvailable === false ? (
            <div>
              <div className="flex items-end gap-2">
                <CountUp
                  to={state.data.total}
                  className="text-5xl font-bold text-foreground leading-none"
                />
                <span className="font-ui text-xs text-muted-foreground mb-1">{state.data.totalLabel}</span>
              </div>
              {state.data.breakdown && (
                <div className="font-ui flex flex-wrap gap-1.5 mt-4">
                  {state.data.breakdown.map((b) => (
                    <span
                      key={b.label}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-background/60 border border-border/40 text-muted-foreground"
                    >
                      {b.label} <span className="text-foreground font-semibold">{b.value}</span>
                    </span>
                  ))}
                </div>
              )}
              <div className="font-ui text-[11px] text-muted-foreground/60 mt-3">
                Day-streak unavailable — LeetCode doesn't expose this profile's calendar
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-end gap-2">
                <Flame className="w-6 h-6 text-primary mb-1.5" />
                <CountUp
                  to={state.data.current}
                  className="text-5xl font-bold text-foreground leading-none"
                />
                <span className="font-ui text-xs text-muted-foreground mb-1">day streak</span>
              </div>
              <div className="font-ui flex flex-wrap gap-x-5 gap-y-1 mt-4 text-[13px]">
                <span className="text-muted-foreground">
                  Best <span className="text-foreground font-semibold">{state.data.longest} days</span>
                </span>
                <span className="text-muted-foreground">
                  {state.data.totalLabel}{" "}
                  <span className="text-foreground font-semibold">{state.data.total}</span>
                </span>
              </div>
              {state.data.extra && (
                <div className="font-ui text-xs text-primary/90 mt-2">{state.data.extra}</div>
              )}
            </div>
          )}
        </CardShell>
      ))}
    </div>
  );
}
