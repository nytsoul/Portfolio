"use client";

import { motion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Magnetic hover: element gravitates toward the cursor (fine pointers only). */
export default function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const finePointer = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: MouseEvent) => {
    if (!finePointer() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
