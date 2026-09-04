"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import CursorGlow from "@/components/motion/CursorGlow";
import { useProfile, useGitHubStats } from "@/hooks/use-api";
import { useFallbackProfile } from "@/hooks/use-fallback-profile";
import { useGitHubSync } from "@/hooks/use-github-sync";

const GlobalBackground = dynamic(() => import("@/components/3d/GlobalBackground"), {
  ssr: false,
});

export default function SiteShell({ children }: { children: React.ReactNode }) {
  useGitHubSync();
  const pathname = usePathname();
  const { data: dbProfile } = useProfile();
  const { data: dbGithubStats } = useGitHubStats();
  const profile = useFallbackProfile(dbProfile);
  // Touch GPUs smear filter-blur transitions — use fade/slide only there.
  // Decided synchronously so animation targets never swap mid-flight.
  const [coarse] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <ScrollProgress />
      <CursorGlow />
      <GlobalBackground />
      {/* ambient editorial glow */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div
          className="absolute w-[700px] h-[700px] -top-56 -left-56 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.12 75 / 0.05) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] -bottom-32 -right-24 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.10 200 / 0.03) 0%, transparent 65%)",
          }}
        />
      </div>

      <Navigation />

      <AnimatePresence mode="wait">
        {/* Wrap in a single element to satisfy mode="wait" which requires only one child */}
        <motion.div key={pathname} className="w-full flex-1">
          {/* Gold veil sweep on every route change */}
          <motion.div
            className="fixed inset-0 z-[60] pointer-events-none"
            style={{
              background:
                "linear-gradient(120deg, oklch(0.78 0.12 75 / 0.16) 0%, oklch(0.07 0.005 260 / 0.92) 45%)",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.main
            initial={coarse ? { opacity: 0, y: 16 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={coarse ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={coarse ? { opacity: 0, y: -8 } : { opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: coarse ? 0.35 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pt-[80px]"
          >
            {children}
          </motion.main>
        </motion.div>
      </AnimatePresence>

      <Footer profile={profile} />
    </div>
  );
}
