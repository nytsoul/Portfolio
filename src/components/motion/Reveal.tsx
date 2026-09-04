"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

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
