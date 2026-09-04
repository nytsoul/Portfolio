"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

function isCoarsePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/**
 * Signature scroll-reveal: rise + fade with expo easing.
 * NOTE: no `filter: blur()` here on purpose — blur freezes on mobile GPUs
 * (backdrop + WebGL behind it smears) and framer-motion can leave a
 * half-finished blur stuck if the animation is interrupted.
 */
export default function Reveal({ children, delay = 0, y = 28, className, once = true }: RevealProps) {
  // Decided synchronously on first render — never swapped mid-flight,
  // otherwise framer-motion can freeze a half-finished transform in place.
  const [coarse] = useState(isCoarsePointer);

  const rise = coarse ? Math.min(y, 18) : y;

  return (
    <motion.div
      initial={{ opacity: 0, y: rise }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: coarse ? 0.5 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
