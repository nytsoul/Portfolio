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
 * Signature scroll-reveal: rise + de-blur with expo easing.
 * On touch devices the blur is skipped (GPU-friendly) with a shorter rise.
 */
export default function Reveal({ children, delay = 0, y = 28, className, once = true }: RevealProps) {
  // Decided synchronously on first render — never swapped mid-flight,
  // otherwise framer-motion can freeze a half-finished blur in place.
  const [coarse] = useState(isCoarsePointer);

  const rise = coarse ? Math.min(y, 18) : y;

  return (
    <motion.div
      initial={coarse ? { opacity: 0, y: rise } : { opacity: 0, y: rise, filter: "blur(6px)" }}
      whileInView={coarse ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: coarse ? 0.5 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
