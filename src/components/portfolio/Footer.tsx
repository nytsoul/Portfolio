import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowUp } from "lucide-react";

interface FooterProps {
    profile: any;
}

export default function Footer({ profile }: FooterProps) {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const socialLinks = [
        {
            icon: Github,
            href: `https://github.com/${profile?.github || "nytsoul"}`,
            label: "GitHub",
        },
        {
            icon: Linkedin,
            href: profile?.linkedin || "#",
            label: "LinkedIn",
        },
        {
            icon: Mail,
            href: `mailto:${profile?.email || "neshun7413@gmail.com"}`,
            label: "Email",
        },
    ].filter((l) => l.href !== "#");

    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Skills", href: "#skills" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <footer className="w-full border-t border-border/60 bg-card/20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    {/* Brand */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/20">
                                <span className="text-sm font-bold text-primary-foreground">N</span>
                            </div>
                            <span className="font-semibold text-foreground">{profile?.name || "Neshun R"}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            {profile?.tagline ||
                                "CS Engineering student passionate about full-stack development, AI, and cybersecurity."}
                        </p>
                        {profile?.location && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70 mt-3">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{profile.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Nav links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                            Navigation
                        </h4>
                        <ul className="space-y-2.5">
                            {navLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                            Connect
                        </h4>
                        <div className="flex flex-col gap-2.5">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("mailto") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                                >
                                    <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider + bottom bar */}
                <div className="h-px bg-border/50 mb-6" />
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground/60">
                        © {new Date().getFullYear()} {profile?.name || "Neshun R"}. Built with React &amp; TypeScript.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        Back to top
                        <span className="w-6 h-6 flex items-center justify-center rounded-md border border-border/60 group-hover:border-primary/50 group-hover:text-primary transition-all">
                            <ArrowUp className="w-3 h-3" />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
