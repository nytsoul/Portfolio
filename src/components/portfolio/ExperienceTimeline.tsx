"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  Code2,
  Rocket,
  MapPin,
  type LucideIcon,
} from "lucide-react";

type EntryType = "education" | "work" | "achievement" | "milestone";

interface TimelineEntry {
  period: string;
  title: string;
  organization?: string;
  location?: string;
  description: string[];
  technologies?: string[];
  type: EntryType;
  icon: LucideIcon;
}

// Merged feed: detailed work/education cards (Timeline) + milestone moments (Journey)
const ENTRIES: TimelineEntry[] = [
  {
    period: "2024",
    title: "Enrolled at SSN College of Engineering",
    organization: "B.E. Computer Science and Engineering",
    location: "Chennai, India",
    description: [
      "Pursuing Bachelor's degree at one of Chennai's top institutions",
      "CGPA: 6.899/10 — focused on algorithms, data structures, and full-stack development",
    ],
    type: "education",
    icon: GraduationCap,
  },
  {
    period: "2024",
    title: "Began Competitive Programming",
    organization: "Codeforces",
    location: "Online",
    description: [
      "50+ problems solved across Codeforces, LeetCode, and more",
      "Strong algorithmic thinking through regular contest participation",
    ],
    technologies: ["C++", "Algorithms", "Data Structures"],
    type: "milestone",
    icon: Code2,
  },
  {
    period: "2024 — Present",
    title: "Full-Stack Developer",
    organization: "Personal Projects",
    location: "Remote",
    description: [
      "Shipped 6 production-grade projects across fintech, AI, and security",
      "Specialized in secure authentication, RESTful APIs, and clean architecture",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    type: "work",
    icon: Briefcase,
  },
  {
    period: "2025",
    title: "Shipped First Production App",
    organization: "Agroverse",
    location: "Live on Vercel",
    description: [
      "First complete end-to-end product — blockchain-backed supply chain platform",
      "Deployed, documented, and demoed for real users",
    ],
    technologies: ["React", "Node.js", "MongoDB"],
    type: "work",
    icon: Rocket,
  },
  {
    period: "Dec 2025",
    title: "SIH Finalist",
    organization: "Smart India Hackathon",
    location: "National Finals",
    description: [
      "Reached the finals of India's largest hackathon",
      "Competed with teams from across the country",
    ],
    type: "achievement",
    icon: Trophy,
  },
  {
    period: "2026",
    title: "Open to Internships & Collaborations",
    organization: "Full-Stack · AI · Cybersecurity",
    location: "Chennai / Remote",
    description: [
      "Actively seeking internship opportunities and collaborative projects",
    ],
    type: "milestone",
    icon: Calendar,
  },
];

const TYPE_STYLES: Record<EntryType, { border: string; badge: string; dot: string; label: string }> = {
  education: {
    border: "border-l-chart-3",
    badge: "bg-chart-3/10 text-chart-3 border-chart-3/25",
    dot: "from-chart-3 to-chart-2",
    label: "Education",
  },
  work: {
    border: "border-l-chart-1",
    badge: "bg-chart-1/10 text-chart-1 border-chart-1/25",
    dot: "from-primary to-chart-1",
    label: "Work",
  },
  achievement: {
    border: "border-l-primary",
    badge: "bg-primary/10 text-primary border-primary/25",
    dot: "from-primary to-chart-2",
    label: "Achievement",
  },
  milestone: {
    border: "border-l-chart-2",
    badge: "bg-chart-2/10 text-chart-2 border-chart-2/25",
    dot: "from-chart-2 to-chart-4",
    label: "Milestone",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: (offset: number) => ({ opacity: 0, x: offset }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 14 },
  },
};

export default function ExperienceTimeline() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative flex justify-center">
      <div className="relative w-full max-w-4xl">
        {/* Center line — left on mobile, center on md+ */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/60 to-primary/20" />

        <div className="space-y-10 md:space-y-14">
          {ENTRIES.map((entry, idx) => {
            const Icon = entry.icon;
            const style = TYPE_STYLES[entry.type];
            const offset = idx % 2 === 0 ? -40 : 40;
            return (
              <motion.div
                key={`${entry.period}-${entry.title}`}
                variants={itemVariants}
                custom={offset}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className={`relative flex items-center ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col`}
              >
                {/* Icon node on the line */}
                <div
                  className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br ${style.dot} flex items-center justify-center text-white ring-4 ring-background z-10 shadow-lg`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Card */}
                <div
                  className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                    idx % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                  }`}
                >
                  <div
                    className={`bg-card/50 border border-border/60 border-l-2 ${style.border} p-5 rounded-xl shadow-md hover:shadow-primary/10 hover:border-primary/25 transition-all`}
                  >
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-sm font-semibold text-primary">{entry.period}</span>
                      <span
                        className={`font-ui text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${style.badge}`}
                      >
                        {style.label}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold text-foreground leading-snug mb-1"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {entry.title}
                    </h3>
                    {(entry.organization || entry.location) && (
                      <div className="font-ui flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground mb-3">
                        {entry.organization && (
                          <span className="text-primary/90 font-medium">{entry.organization}</span>
                        )}
                        {entry.organization && entry.location && <span>•</span>}
                        {entry.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {entry.location}
                          </span>
                        )}
                      </div>
                    )}
                    <ul className="space-y-1.5 mb-3">
                      {entry.description.map((d, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                          <span className="text-primary mt-0.5 shrink-0">▸</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    {entry.technologies && (
                      <div className="font-ui flex flex-wrap gap-1.5">
                        {entry.technologies.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-background/70 border border-border/40 text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
