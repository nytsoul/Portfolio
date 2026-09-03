"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  sub?: string;
  className?: string;
}

/** Standard editorial section header used across all pages. */
export default function SectionHeading({ label, title, sub, className = "" }: SectionHeadingProps) {
  return (
    <Reveal className={`mb-12 lg:mb-16 ${className}`}>
      <p className="section-label mb-4">{label}</p>
      <h2 className="text-display-md">{title}</h2>
      {sub && <p className="text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">{sub}</p>}
    </Reveal>
  );
}
