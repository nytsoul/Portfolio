import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
    profile: any;
}

export default function Footer({ profile }: FooterProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        {
            icon: Github,
            href: `https://github.com/${profile?.github || "nytsoul"}`,
            label: "GitHub",
            color: "hover:text-foreground",
        },
        {
            icon: Linkedin,
            href: profile?.linkedin || "#",
            label: "LinkedIn",
            color: "hover:text-chart-2",
        },
        {
            icon: Mail,
            href: `mailto:${profile?.email || "neshun7413@gmail.com"}`,
            label: "Email",
            color: "hover:text-chart-1",
        },
    ];

    const quickLinks = [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Skills", href: "#skills" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <footer className="relative w-full bg-gradient-to-b from-background to-secondary/20 border-t border-border overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-bold text-foreground mb-4">
                            {profile?.name || "Neshun R"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            {profile?.tagline || "Full-stack developer passionate about AI, cybersecurity, and building scalable systems"}
                        </p>
                        {profile?.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{profile.location}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-xl font-bold text-foreground mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                                >
                                    <a
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2" />
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-bold text-foreground mb-4">Connect</h3>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`p-3 bg-secondary/50 rounded-lg text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:bg-secondary`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Bottom Section */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="text-sm text-muted-foreground text-center md:text-left">
                        <p className="flex items-center justify-center md:justify-start gap-1">
                            © {new Date().getFullYear()} {profile?.name || "Neshun R"}. Made with
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                            >
                                <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
                            </motion.span>
                            using React & TypeScript
                        </p>
                    </div>

                    {/* Scroll to Top Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={scrollToTop}
                            className="group"
                        >
                            <span className="mr-2">Back to Top</span>
                            <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowUp className="w-4 h-4" />
                            </motion.div>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
}
