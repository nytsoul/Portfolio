import { useState, useEffect, useMemo } from "react";

/** Breakpoint thresholds (px) */
const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  /** Device pixel ratio, clamped to 2 for performance */
  dpr: number;
  width: number;
  height: number;
}

export function useDevice(): DeviceInfo {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    let raf: number;
    const handleResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return useMemo(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    return {
      isMobile: size.width < BREAKPOINTS.md,
      isTablet: size.width >= BREAKPOINTS.md && size.width < BREAKPOINTS.lg,
      isDesktop: size.width >= BREAKPOINTS.lg,
      isTouch,
      prefersReducedMotion,
      dpr,
      width: size.width,
      height: size.height,
    };
  }, [size.width, size.height]);
}
