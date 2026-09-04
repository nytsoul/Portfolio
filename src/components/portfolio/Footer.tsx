"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, ArrowUp, ArrowUpRight, Instagram, Phone } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import { env } from "@/lib/env";

interface FooterProps {
    profile: any;
}

export default function Footer({ profile }: FooterProps) {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const socialLinks = [
        { icon: Github, href: `https://github.com/${profile?.github || "nytsoul"}`, label: "GitHub", value: profile?.github || "nytsoul" },
        { icon: Linkedin, href: profile?.linkedin || env.portfolio.linkedin, label: "LinkedIn", value: "neshun-r" },
        { icon: Mail, href: `mailto:${profile?.email || "neshun7413@gmail.com"}`, label: "Email", value: "Say hello" },
        { icon: Phone, href: `tel:${profile?.phone || env.portfolio.phone}`, label: "Phone", value: profile?.phoneDisplay || env.portfolio.phoneDisplay },
        { icon: Instagram, href: profile?.instagram || env.portfolio.instagram, label: "Instagram", value: "@nytsoul" },
    ].filter((l) => l.href);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Experience", href: "/experience" },
        { label: "Skills", href: "/skills" },
        { label: "Achievements", href: "/achievements" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <footer className="relative w-full overflow-hidden bg-card">
            {/* Glass shell — light blur on desktop, solid on small screens (no backdrop smear) */}
            <div className="footer-glass absolute inset-0 bg-card/70 backdrop-blur-md max-md:bg-card max-md:backdrop-blur-none border-t border-white/10" aria-hidden />
            {/* Floating orbs — desktop only, they smear under backdrop-blur on mobile GPUs */}
            <div
                className="absolute -top-24 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-[orb-float_14s_ease-in-out_infinite_alternate] hidden md:block"
                style={{ background: "radial-gradient(circle, oklch(0.78 0.12 75 / 0.10) 0%, transparent 65%)" }}
                aria-hidden
            />
            <div
                className="absolute -bottom-32 right-1/5 w-[28rem] h-[28rem] rounded-full pointer-events-none animate-[orb-float_18s_ease-in-out_infinite_alternate-reverse] hidden md:block"
                style={{ background: "radial-gradient(circle, oklch(0.72 0.10 200 / 0.07) 0%, transparent 65%)" }}
                aria-hidden
            />
            {/* Shimmer top edge */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" aria-hidden />
            <style>{`@keyframes orb-float { from { transform: translate3d(-4%, -2%, 0); } to { transform: translate3d(4%, 3%, 0); } }`}</style>

            <div className="relative w-full px-6 lg:px-16 pt-16 pb-8">
                {/* ── CTA row ── */}
                <Reveal className="flex flex-col lg:flex-row lg:items-center gap-6 pb-12 mb-12 border-b border-white/10">
                    <h2 className="text-display-sm flex-1">
                        Have an idea? Let's <span className="italic gradient-text">build it.</span>
                    </h2>
                    <Magnetic strength={0.3}>
                        <Link
                            href="/contact"
                            className="font-ui inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 shrink-0"
                        >
                            Get in Touch <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </Magnetic>
                </Reveal>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <Reveal className="col-span-2" delay={0.05}>
                        <div className="mb-4">
                            <span
                                className="text-4xl font-bold italic gradient-text leading-none"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                NR.
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mb-4">
                            {profile?.tagline ||
                                "CS Engineering student passionate about full-stack development, AI, and cybersecurity."}
                        </p>
                        <div className="font-ui flex flex-wrap items-center gap-2">
                            {profile?.location && (
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground/70 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                    <MapPin className="w-3 h-3" />
                                    {profile.location}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 text-xs text-chart-3 px-3 py-1.5 rounded-full bg-chart-3/10 border border-chart-3/25">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute h-full w-full rounded-full bg-chart-3 opacity-60" />
                                    <span className="relative h-1.5 w-1.5 rounded-full bg-chart-3" />
                                </span>
                                Open to work
                            </span>
                        </div>
                    </Reveal>

                    {/* Navigation */}
                    <Reveal className="font-ui" delay={0.1}>
                        <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55 mb-4">
                            Navigation
                        </h4>
                        <ul className="space-y-1">
                            {navLinks.map(({ label, href }, i) => (
                                <motion.li
                                    key={label}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.04 }}
                                >
                                    <Link
                                        href={href}
                                        className="group inline-flex items-center gap-0 text-sm text-muted-foreground hover:text-foreground transition-all hover:gap-1.5 py-1"
                                    >
                                        <ArrowUpRight className="w-3 h-3 text-primary opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </Reveal>

                    {/* Social */}
                    <Reveal className="font-ui" delay={0.15}>
                        <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55 mb-4">
                            Connect
                        </h4>
                        <div className="flex flex-col gap-1">
                            {socialLinks.map(({ icon: Icon, href, label, value }, i) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.04 }}
                                    whileHover={{ x: 3 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <span className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
                                        <Icon className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                                    </span>
                                    <span className="flex-1">
                                        {label}
                                        <span className="block text-[11px] text-muted-foreground/50 truncate max-w-[140px]">{value}</span>
                                    </span>
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                                </motion.a>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Bottom bar */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6" />
                <div className="font-ui flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-muted-foreground/50">
                        © {new Date().getFullYear()}{" "}
                        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                            {profile?.name || "Neshun R"}
                        </span>
                        . Crafted with Next.js &amp; TypeScript.
                    </p>
                    <Magnetic strength={0.4}>
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-[11px] text-muted-foreground/60 hover:text-foreground transition-colors group"
                        >
                            Back to top
                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                                <ArrowUp className="w-3.5 h-3.5 group-hover:text-primary group-hover:-translate-y-0.5 transition-all" />
                            </span>
                        </button>
                    </Magnetic>
                </div>
            </div>
        </footer>
    );
}
