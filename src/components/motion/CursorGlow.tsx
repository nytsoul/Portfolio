"use client";

import { useEffect, useRef } from "react";

/** Ambient cursor glow that trails the mouse (desktop, motion-safe only). */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "1";
    let x = -600;
    let y = -600;
    let tx = x;
    let ty = y;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate(${x - 260}px, ${y - 260}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed top-0 left-0 z-[4] pointer-events-none opacity-0 transition-opacity duration-700 hidden [@media(pointer:fine)]:block"
    >
      <div
        className="w-[520px] h-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.12 75 / 0.07) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
