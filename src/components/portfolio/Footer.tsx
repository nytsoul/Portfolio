import { Github, Linkedin, Mail, MapPin, ArrowUp } from "lucide-react";

interface FooterProps {
    profile: any;
}

export default function Footer({ profile }: FooterProps) {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const socialLinks = [
        { icon: Github, href: `https://github.com/${profile?.github || "nytsoul"}`, label: "GitHub" },
        { icon: Linkedin, href: profile?.linkedin || "", label: "LinkedIn" },
        { icon: Mail, href: `mailto:${profile?.email || "neshun7413@gmail.com"}`, label: "Email" },
    ].filter((l) => l.href);

    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Skills", href: "#skills" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <footer className="w-full border-t border-border/50 bg-card/15">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

                    {/* Brand */}
                    <div className="col-span-2">
                        <div className="mb-4">
                            <span
                                className="text-3xl font-bold italic text-primary/70 leading-none"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                NR.
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mb-3">
                            {profile?.tagline ||
                                "CS Engineering student passionate about full-stack development, AI, and cybersecurity."}
                        </p>
                        {profile?.location && (
                            <div className="font-ui flex items-center gap-1.5 text-xs text-muted-foreground/55">
                                <MapPin className="w-3 h-3" />
                                {profile.location}
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="font-ui">
                        <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55 mb-4">
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
                    <div className="font-ui">
                        <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55 mb-4">
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
                                    <Icon className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="h-px bg-border/40 mb-6" />
                <div className="font-ui flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-[11px] text-muted-foreground/50">
                        © {new Date().getFullYear()}{" "}
                        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                            {profile?.name || "Neshun R"}
                        </span>
                        . Crafted with React &amp; TypeScript.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-[11px] text-muted-foreground/50 hover:text-foreground transition-colors group"
                    >
                        Back to top
                        <span className="w-6 h-6 flex items-center justify-center rounded border border-border/50 group-hover:border-primary/40 group-hover:text-primary transition-all">
                            <ArrowUp className="w-3 h-3" />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
