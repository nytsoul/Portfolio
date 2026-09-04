import { motion } from "framer-motion";
import { Briefcase, Code, Trophy, GraduationCap, ArrowUpRight } from "lucide-react";
import GitHubStats from "./GitHubStats";
import CompetitiveProgramming from "./CompetitiveProgramming";
import Streaks from "./Streaks";
import ExperienceTimeline from "./ExperienceTimeline";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/motion/SectionHeading";
import CountUp from "@/components/motion/CountUp";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CURATED_PROJECTS } from "@/data/project-config";

export default function About() {
  const stats = [
    { title: "Experience", value: 2, suffix: "+", unit: "Years", decimals: 0, icon: Briefcase, accent: "text-chart-1" },
    { title: "Projects", value: CURATED_PROJECTS.length, suffix: "", unit: "Shipped", decimals: 0, icon: Code, accent: "text-chart-2" },
    { title: "CP Problems", value: 50, suffix: "+", unit: "Solved", decimals: 0, icon: Trophy, accent: "text-chart-3" },
    { title: "CGPA", value: 6.899, suffix: "", unit: "/ 10.0", decimals: 3, icon: GraduationCap, accent: "text-chart-4" },
  ];

  const expertise = [
    {
      title: "Full-Stack Development",
      description:
        "End-to-end web applications with modern frameworks. Responsive frontends, RESTful APIs, and scalable backend architectures built for production.",
      tags: ["React", "Next.js", "Node.js", "Express"],
      borderColor: "border-l-chart-1",
    },
    {
      title: "AI & Machine Learning",
      description:
        "Integrating AI capabilities into production systems — LLMs, computer vision, and intelligent automation pipelines that enhance real-world workflows.",
      tags: ["Python", "TensorFlow", "LLMs", "OpenAI API"],
      borderColor: "border-l-chart-2",
    },
    {
      title: "Cybersecurity",
      description:
        "Security-first development, penetration testing, and hardened system design that protects both infrastructure and user data.",
      tags: ["Ethical Hacking", "OWASP", "Linux", "CTF"],
      borderColor: "border-l-chart-3",
    },
  ];

  const quickFacts = [
    { label: "Location", value: "Chennai, India" },
    { label: "Degree", value: "B.E. Computer Science" },
    { label: "Year", value: "3rd Year (2024 – 2028)" },
    { label: "Status", value: "Open to Work" },
  ];

  return (
    <div className="w-full px-6 lg:px-16">
      {/* ── Hero statement ── */}
      <Reveal className="mb-16 lg:mb-20">
        <p className="section-label mb-4">About</p>
        <h2 className="text-display-lg max-w-4xl">
          Engineer by training. <span className="italic gradient-text">Builder</span> by obsession.
        </h2>
      </Reveal>

      {/* ── Bio grid ── */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 xl:gap-16 mb-20">
        <Reveal delay={0.1} className="space-y-5">
          <p className="text-xl lg:text-2xl leading-[1.6] text-foreground/90 font-medium">
            I'm <span className="gradient-text font-bold">Neshun R</span>, a 3rd-year Computer Science
            Engineering student at SSN College of Engineering, Chennai.
          </p>
          <p className="text-base leading-[1.85] text-muted-foreground">
            My journey started with a deep curiosity about how digital systems are engineered and has evolved into a mission
            to build robust, scalable products that solve real-world problems. I combine architectural rigour with
            an obsession for user experience — living by <em className="text-primary not-italic">"Consistency beats motivation."</em>
          </p>
          <p className="text-base leading-[1.85] text-muted-foreground">
            I write clean, maintainable code and believe that quality, not just functionality, defines great software.
            With expertise ranging from full-stack development to AI integration and cybersecurity, I push the
            boundaries of what modern technology can accomplish.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="rounded-xl border border-border/55 bg-card/50 p-7 lg:sticky lg:top-24">
            <p className="section-label mb-6">Quick Facts</p>
            <div className="space-y-5 font-ui">
              {quickFacts.map(({ label, value }) => (
                <div key={label} className="flex items-baseline justify-between gap-4 border-b border-border/30 pb-4 last:border-0 last:pb-0">
                  <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60 shrink-0">{label}</div>
                  <div className="text-sm font-medium text-foreground text-right">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-24">
        {stats.map(({ title, value, suffix, unit, decimals, icon: Icon, accent }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="group bg-card/50 border border-border/60 rounded-xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all h-full">
              <Icon className={`w-4 h-4 ${accent} mb-4 opacity-80 group-hover:scale-110 transition-transform`} />
              <CountUp
                to={value}
                suffix={suffix}
                decimals={decimals}
                className="block text-3xl font-bold text-foreground mb-0.5"
              />
              <div className="font-ui text-[10px] tracking-wide uppercase text-muted-foreground/60">{unit}</div>
              <div className="font-ui text-xs text-muted-foreground mt-0.5">{title}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── Expertise ── */}
      <div className="mb-24">
        <SectionHeading
          label="Expertise"
          title={<>Deep, not <span className="italic gradient-text">wide.</span></>}
          sub="Three disciplines I ship production work in — every claim backed by a live project."
        />
        <div className="grid md:grid-cols-3 gap-4">
          {expertise.map(({ title, description, tags, borderColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className={`p-7 bg-card/40 border border-border/50 border-l-2 ${borderColor} rounded-xl hover:bg-card/70 hover:shadow-xl hover:shadow-primary/5 transition-all group`}
            >
              <div className="font-mono text-xs text-primary/60 mb-4">0{i + 1}</div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {title}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0 ml-2" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{description}</p>
              <div className="font-ui flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-background/60 border border-border/40 text-muted-foreground group-hover:border-primary/25 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Journey ── */}
      <div className="mb-24">
        <SectionHeading
          label="Journey"
          title={<>Every step, <span className="italic gradient-text">earned.</span></>}
        />
        <ExperienceTimeline />
      </div>

      {/* ── Competitive Programming ── */}
      <div className="mb-24">
        <SectionHeading
          label="Competitive Programming"
          title={<>Trained on <span className="italic gradient-text">hard problems.</span></>}
          sub="Live streaks pulled from GitHub, Codeforces, and LeetCode — they move when I do."
        />
        <Streaks />
        <div className="mt-4">
          <CompetitiveProgramming />
        </div>
      </div>

      {/* ── GitHub Stats ── */}
      <div>
        <SectionHeading
          label="GitHub Activity"
          title={<>Proof, <span className="italic gradient-text">live.</span></>}
          sub="Pulled straight from the GitHub API — no screenshots, no stale numbers."
        />
        <ErrorBoundary
          fallback={
            <div className="p-8 border border-border/50 rounded-lg text-center text-sm text-muted-foreground">
              GitHub stats temporarily unavailable.
            </div>
          }
        >
          <GitHubStats />
        </ErrorBoundary>
      </div>
    </div>
  );
}
