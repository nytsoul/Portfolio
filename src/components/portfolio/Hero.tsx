import { motion } from "framer-motion";
import { Github, Mail, Linkedin, MapPin, ArrowDown, Instagram } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TypeWriter from "./TypeWriter";

interface HeroProps {
  profile: any;
  githubStats: any;
}

export default function Hero({ profile, githubStats }: HeroProps) {
  const stats = [
    { label: "Repositories", value: githubStats?.publicRepos ?? 0 },
    { label: "GitHub Stars", value: githubStats?.totalStars ?? 0 },
    { label: "CP Problems", value: "300+" },
    { label: "Projects Built", value: "30+" },
  ];

  const socialLinks = [
    profile?.github && { icon: Github, href: `https://github.com/${profile.github}`, label: "GitHub" },
    profile?.email && { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
    profile?.linkedin && { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    profile?.instagram && { icon: Instagram, href: profile.instagram, label: "Instagram" },
  ].filter(Boolean) as { icon: any; href: string; label: string }[];


  return (
    <div className="relative min-h-screen flex flex-col justify-center">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 15% 30%, oklch(0.78 0.12 75 / 0.06) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 50% at 85% 70%, oklch(0.72 0.10 200 / 0.04) 0%, transparent 60%)",
        }}
      />
      {/* Fine grain noise grid */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.55 0.01 80 / 0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="w-full px-6 lg:px-16 pt-24 pb-16">
        {/* Main hero grid */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-16 xl:gap-28 items-center min-h-[calc(100vh-12rem)]">

          {/* ── Left: Text ── */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-ui inline-flex items-center gap-2 mb-8 px-3 py-1.5 border border-border/50 bg-card/40 rounded-full text-xs text-muted-foreground backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-chart-3 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-chart-3" />
              </span>
              Open to internships &amp; collaborations
            </motion.div>

            {/* First name only */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[1.0] mb-6">
                Neshun
              </h1>
            </motion.div>


            {/* Location */}
            {profile?.location && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-ui flex items-center gap-1.5 mb-6 text-xs tracking-wide text-muted-foreground/70"
              >
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </motion.div>
            )}

            {/* Typewriter — source serif */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="min-h-[32px] mb-6"
            >
              <TypeWriter
                texts={[
                  "Full-Stack Developer & AI Enthusiast",
                  "Cybersecurity Researcher",
                  "Competitive Programmer",
                  "CS Engineering @ SSN College",
                  "\"Consistency beats motivation.\"",
                ]}
                typingSpeed={42}
                deletingSpeed={22}
                pauseDuration={3000}
                className="text-base text-muted-foreground italic"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base text-muted-foreground leading-relaxed max-w-[480px] mb-8"
            >
              {profile?.bio ??
                "2nd-year CS Engineering student at SSN College of Engineering, Chennai — building robust, scalable systems with a focus on clean architecture and exceptional user experiences."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-ui flex flex-wrap items-center gap-3 mb-8"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 text-sm font-medium border border-border/70 text-foreground/80 rounded hover:bg-accent/40 hover:text-foreground transition-all"
              >
                Get in Touch
              </button>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded border border-border/50 bg-card/40 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Portrait + Stats ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-8 lg:items-end"
          >
            {/* Portrait */}
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/15 via-transparent to-chart-2/10 blur-2xl" />
              <div className="relative">
                <Avatar className="w-56 h-56 lg:w-[260px] lg:h-[260px] ring-1 ring-border/60 ring-offset-4 ring-offset-background shadow-2xl shadow-black/40">
                  <AvatarImage src={profile?.profileImage || "/profile.jpg"} className="object-cover" />
                  <AvatarFallback
                    className="text-5xl font-bold text-foreground/60"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
                  >
                    {profile?.name?.split(" ").map((n: string) => n[0]).join("") ?? "NR"}
                  </AvatarFallback>
                </Avatar>
                {/* Corner accent */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary text-lg font-bold italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ✦
                  </span>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[280px] font-ui">
              {stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-card/60 border border-border/60 rounded-lg p-4 text-center hover:border-primary/30 transition-colors"
                >
                  <div className="text-2xl font-bold text-foreground mb-0.5">{value}</div>
                  <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-center pt-4 pb-2"
        >
          <motion.button
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="font-ui flex flex-col items-center gap-2 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
