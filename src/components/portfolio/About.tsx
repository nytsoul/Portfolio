import { motion } from "framer-motion";
import { Briefcase, Code, Trophy, GraduationCap, ArrowUpRight } from "lucide-react";
import GitHubStats from "./GitHubStats";
import CompetitiveProgramming from "./CompetitiveProgramming";
import JourneyTimeline from "./JourneyTimeline";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function About() {
  const stats = [
    { title: "Experience", value: "2+", unit: "Years", icon: Briefcase, accent: "text-chart-1" },
    { title: "Projects", value: "20+", unit: "Completed", icon: Code, accent: "text-chart-2" },
    { title: "CP Problems", value: "100+", unit: "Solved", icon: Trophy, accent: "text-chart-3" },
    { title: "CGPA", value: "6.875", unit: "/ 10.0", icon: GraduationCap, accent: "text-chart-4" },
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

  // journey entries moved into dedicated component for an improved layout
  // const timeline = [
  //   { year: "2024", event: "Enrolled — SSN College of Engineering, Chennai" },
  //   { year: "2024", event: "Began competitive programming on Codeforces" },
  //   { year: "2025", event: "Shipped first full-stack production application" },
  //   { year: "2025", event: "SIH finalist in December" },
  //   { year: "2026", event: "Open to internships & collaborative projects" },
  // ];


  const quickFacts = [
    { label: "Location", value: "Chennai, India" },
    { label: "Degree", value: "B.E. Computer Science" },
    { label: "Year", value: "2nd Year (2024 – 2028)" },
    { label: "Status", value: "Open to Work" },
  ];

  return (
    <div className="w-full px-6 lg:px-16">

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="section-label mb-4">About</p>
        <h2 className="text-5xl lg:text-6xl font-bold">
          The person{" "}
          <span className="italic gradient-text">behind</span>
          <br />
          the keyboard.
        </h2>
      </motion.div>

      {/* ── Bio + Timeline ── */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 mb-20">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-5"
        >
          <p className="text-base leading-[1.85] text-foreground/85">
            I'm <span className="font-semibold text-foreground">Neshun R</span>, a passionate 2nd-year Computer Science
            Engineering student at{" "}
            <span className="italic text-foreground">SSN College of Engineering, Chennai</span>. I live by{" "}
            <em className="text-primary not-italic">"Consistency beats motivation."</em>
          </p>
          <p className="text-base leading-[1.85] text-muted-foreground">
            My journey started with a deep curiosity about how digital systems are engineered and has evolved into a mission
            to build robust, scalable products that solve real-world problems. I combine architectural rigour with
            an obsession for user experience.
          </p>
          <p className="text-base leading-[1.85] text-muted-foreground">
            I write clean, maintainable code and believe that quality, not just functionality, defines great software.
            With expertise ranging from full-stack development to AI integration and cybersecurity, I push the
            boundaries of what modern technology can accomplish.
          </p>

          {/* Quick facts — sans for data readability */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 font-ui">
            {quickFacts.map(({ label, value }) => (
              <div key={label}>
                <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60 mb-0.5">{label}</div>
                <div className="text-sm font-medium text-foreground">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Journey timeline now handled by dedicated component */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="section-label mb-6">Journey</p>
          <JourneyTimeline />
        </motion.div>
      </div>

      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-20"
      >
        {stats.map(({ title, value, unit, icon: Icon, accent }) => (
          <div
            key={title}
            className="bg-card/50 border border-border/60 rounded-lg p-6 hover:border-primary/25 transition-colors"
          >
            <Icon className={`w-4 h-4 ${accent} mb-4 opacity-80`} />
            <div className="text-3xl font-bold text-foreground mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
              {value}
            </div>
            <div className="font-ui text-[10px] tracking-wide uppercase text-muted-foreground/60">{unit}</div>
            <div className="font-ui text-xs text-muted-foreground mt-0.5">{title}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Expertise ── */}
      <div className="mb-20">
        <p className="section-label mb-8">Expertise</p>
        <div className="grid md:grid-cols-3 gap-4">
          {expertise.map(({ title, description, tags, borderColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className={`p-6 bg-card/40 border border-border/50 border-l-2 ${borderColor} rounded-lg hover:bg-card/70 transition-colors group`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[15px] font-semibold text-foreground leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {title}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
              <div className="font-ui flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-background/60 border border-border/40 text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Competitive Programming ── */}
      <div className="mb-20">
        <p className="section-label mb-8">Competitive Programming</p>
        <CompetitiveProgramming />
      </div>

      {/* ── GitHub Stats ── */}
      <div>
        <p className="section-label mb-8">GitHub Activity</p>
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
