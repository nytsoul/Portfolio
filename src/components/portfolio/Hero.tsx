import { motion } from "framer-motion";
import { Github, Mail, Linkedin, MapPin, Download, ArrowDown, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TypeWriter from "./TypeWriter";

interface HeroProps {
  profile: any;
  githubStats: any;
}

export default function Hero({ profile, githubStats }: HeroProps) {
  const stats = [
    { label: "Public Repos", value: githubStats?.publicRepos || 0 },
    { label: "GitHub Stars", value: githubStats?.totalStars || 0 },
    { label: "Followers", value: githubStats?.followers || 0 },
    { label: "Problems Solved", value: "300+" },
  ];

  const socialLinks = [
    profile?.github && {
      icon: Github,
      href: `https://github.com/${profile.github}`,
      label: "GitHub",
    },
    profile?.email && {
      icon: Mail,
      href: `mailto:${profile.email}`,
      label: "Email",
    },
    profile?.linkedin && {
      icon: Linkedin,
      href: profile.linkedin,
      label: "LinkedIn",
    },
    profile?.instagram && {
      icon: Instagram,
      href: profile.instagram,
      label: "Instagram",
    },
  ].filter(Boolean) as { icon: any; href: string; label: string }[];

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, oklch(0.68 0.22 255 / 0.06) 0%, transparent 50%), radial-gradient(circle at 75% 75%, oklch(0.72 0.18 200 / 0.04) 0%, transparent 50%)",
        }}
      />
      {/* Fine dot grid */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(0.55 0.012 255 / 0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-16 xl:gap-24 items-center">
          {/* Left Column — Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/50 text-xs text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-3 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-3" />
              </span>
              Open to opportunities
            </motion.div>

            {/* Name */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-none"
              >
                {profile?.name?.split(" ")[0] || "Neshun"}
                <br />
                <span className="gradient-text">
                  {profile?.name?.split(" ").slice(1).join(" ") || "R"}
                </span>
              </motion.h1>
              {profile?.location && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-1.5 mt-4 text-muted-foreground text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </motion.div>
              )}
            </div>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="min-h-[36px]"
            >
              <TypeWriter
                texts={[
                  "Full-Stack Developer & AI Enthusiast",
                  "Cybersecurity Researcher",
                  "Competitive Programmer",
                  "CS Engineering Student @ SSN",
                  "\"Consistency beats motivation.\"",
                ]}
                typingSpeed={45}
                deletingSpeed={25}
                pauseDuration={2800}
                className="text-xl lg:text-2xl text-muted-foreground font-medium"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base text-muted-foreground leading-relaxed max-w-xl"
            >
              {profile?.bio ||
                "2nd-year CS Engineering student at SSN College of Engineering, Chennai. Building robust, scalable systems with a focus on clean architecture and exceptional user experiences."}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-semibold px-6"
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="font-semibold px-6 border-border hover:bg-accent/50"
              >
                Get in Touch
              </Button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/60 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent/60 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — Avatar + Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-end gap-8"
          >
            {/* Profile image */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-chart-2/10 to-transparent blur-2xl" />
              <div className="relative w-56 h-56 lg:w-64 lg:h-64">
                <Avatar className="w-full h-full ring-2 ring-border/60 ring-offset-4 ring-offset-background shadow-2xl">
                  <AvatarImage src={profile?.profileImage || "/profile.jpg"} className="object-cover" />
                  <AvatarFallback className="text-5xl font-bold bg-gradient-to-br from-primary/30 to-chart-2/20 text-foreground">
                    {profile?.name?.split(" ").map((n: string) => n[0]).join("") || "NR"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
              {stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-card/60 border border-border/60 rounded-xl p-4 text-center backdrop-blur-sm hover:border-primary/40 transition-colors"
                >
                  <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-20"
        >
          <motion.button
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors text-xs tracking-wider uppercase"
          >
            <span>Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
