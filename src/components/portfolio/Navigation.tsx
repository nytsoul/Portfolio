import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      const sections = ["hero", "about", "projects", "skills", "contact"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          return r.top <= 100 && r.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "glass-strong shadow-xl shadow-black/40 border-b border-border/50"
          : "bg-transparent"
          }`}
      >
        <div className="w-full px-6 lg:px-16">
          <div className="flex items-center justify-between h-[58px]">
            {/* Logo — Playfair Display italic monogram */}
            <button
              onClick={() => scrollTo("#hero")}
              className="group flex items-center gap-3"
            >
              <span
                className="text-2xl font-bold italic text-primary leading-none"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                NR.
              </span>
              <span className="font-ui text-xs tracking-[0.18em] uppercase text-muted-foreground/60 hidden sm:block">
                Portfolio
              </span>
            </button>

            {/* Desktop nav — sans-serif for UI clarity */}
            <div className="hidden md:flex items-center gap-0.5 font-ui">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollTo(item.href)}
                    className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-200 ${isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-1.5 left-4 right-4 h-px bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => scrollTo("#contact")}
                className="font-ui text-[13px] font-semibold px-4 py-1.5 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="font-ui w-9 h-9 flex items-center justify-center rounded border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-[58px] left-0 right-0 z-40 glass-strong border-b border-border/50 md:hidden"
        >
          <div className="w-full px-6 py-4 space-y-0.5 font-ui">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className={`w-full text-left px-3 py-2.5 text-[13px] font-medium rounded-md transition-colors ${isActive
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
}
