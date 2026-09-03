"use client";

import { useState } from "react";
import { getSkillIcon } from "@/data/skill-icons";
import { cn } from "@/lib/utils";

interface TechIconProps {
  skillId: string;
  skillName: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Real brand mark with graceful fallback:
 * tries the devicon SVG first, drops to a monogram tile on error.
 */
export default function TechIcon({ skillId, skillName, className, imgClassName }: TechIconProps) {
  const meta = getSkillIcon(skillId);
  const [failed, setFailed] = useState(!meta.src);

  if (failed || !meta.src) {
    return (
      <span
        className={cn(
          "flex items-center justify-center rounded-lg border font-mono font-bold select-none",
          className,
        )}
        style={{
          color: meta.color,
          backgroundColor: `${meta.color}14`,
          borderColor: `${meta.color}35`,
        }}
        aria-label={skillName}
        role="img"
      >
        <span className="text-sm">{meta.initials}</span>
      </span>
    );
  }

  return (
    <span
      className={cn("flex items-center justify-center rounded-lg bg-white/[0.04] border border-border/60", className)}
    >
      <img
        src={meta.src}
        alt={`${skillName} logo`}
        loading="lazy"
        draggable={false}
        onError={() => setFailed(true)}
        className={cn("object-contain", meta.invert && "invert", imgClassName)}
      />
    </span>
  );
}
