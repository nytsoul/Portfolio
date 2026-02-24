import { motion } from "framer-motion";
import { Briefcase, Code, Trophy, GraduationCap, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import GitHubStats from "./GitHubStats";
import CompetitiveProgramming from "./CompetitiveProgramming";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function About() {
  const stats = [
    { title: "Experience", value: "2+", unit: "Years", icon: Briefcase, color: "text-chart-1" },
    { title: "Projects", value: "30+", unit: "Completed", icon: Code, color: "text-chart-2" },
    { title: "CP Problems", value: "300+", unit: "Solved", icon: Trophy, color: "text-chart-3" },
    { title: "CGPA", value: "6.875", unit: "/ 10.0", icon: GraduationCap, color: "text-chart-4" },
  ];

  const expertise = [
    {
      title: "Full-Stack Development",
      description:
        "End-to-end web applications with modern frameworks. Responsive frontends, RESTful APIs, and scalable backend architectures.",
      tags: ["React", "Next.js", "Node.js", "Express"],
      accent: "border-l-chart-1",
    },
    {
      title: "AI & Machine Learning",
      description:
        "Integrating AI capabilities into production systems. Working with LLMs, computer vision, and building intelligent automation pipelines.",
      tags: ["Python", "TensorFlow", "LLMs", "OpenAI"],
      accent: "border-l-chart-2",
    },
    {
      title: "Cybersecurity",
      description:
        "Security-first development, penetration testing, and building hardened systems that protect user data and infrastructure.",
      tags: ["Ethical Hacking", "OWASP", "Linux", "CTF"],
      accent: "border-l-chart-3",
    },
  ];

  const timeline = [
    { year: "2023", event: "Enrolled at SSN College of Engineering, Chennai" },
    { year: "2023", event: "Started competitive programming on Codeforces" },
    { year: "2024", event: "Built first full-stack production application" },
    { year: "2024", event: "Explored cybersecurity & penetration testing" },
    { year: "2025", event: "Open to internships & collaborative projects" },
  ];

  return (
    <div className="w-full px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="section-label">About</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            The person behind
            <br />
            <span className="gradient-text">the keyboard</span>
          </h2>
        </motion.div>

        {/* Bio + Timeline */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 mb-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-base text-foreground/80 leading-relaxed">
              I'm <span className="font-semibold text-foreground">Neshun R</span>, a passionate 2nd-year Computer Science
              Engineering student at{" "}
              <span className="font-medium text-foreground">SSN College of Engineering, Chennai</span>. I believe in the
              philosophy that{" "}
              <em className="text-primary not-italic font-medium">"Consistency beats motivation."</em>
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              My journey started with a curiosity about how things work and has evolved into a deep passion for building
              robust, scalable systems that solve real-world problems. I combine architectural thinking with a strong
              focus on user experience — ensuring solutions are both powerful and intuitive.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              With expertise spanning full-stack development, AI integration, and cybersecurity, I'm constantly pushing
              boundaries with modern technology. Clean code, maintainable architecture, and high-quality delivery are
              non-negotiables for me.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: "Location", value: "Chennai, India" },
                { label: "Degree", value: "CS Engineering" },
                { label: "Year", value: "2nd Year (2023–2027)" },
                { label: "Status", value: "Open to Work" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Timeline</h3>
            <div className="relative space-y-0">
              {timeline.map(({ year, event }, i) => (
                <div key={i} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-border/60 mt-1" />}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-primary/70">{year}</span>
                    <p className="text-sm text-foreground/80 mt-0.5 leading-snug">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map(({ title, value, unit, icon: Icon, color }) => (
            <div
              key={title}
              className="bg-card/60 border border-border/60 rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <Icon className={`w-5 h-5 ${color} mb-3`} />
              <div className="text-3xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{unit}</div>
              <div className="text-xs text-muted-foreground mt-0.5 font-medium">{title}</div>
            </div>
          ))}
        </motion.div>

        {/* Expertise */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">Areas of Expertise</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {expertise.map(({ title, description, tags, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card
                  className={`p-6 bg-card/50 border-border/60 border-l-2 ${accent} h-full hover:bg-card/80 transition-colors group`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-foreground text-sm leading-snug">{title}</h4>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-accent/60 text-muted-foreground font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Competitive Programming */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            Competitive Programming
          </h3>
          <CompetitiveProgramming />
        </div>

        {/* GitHub Stats */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            GitHub Activity
          </h3>
          <ErrorBoundary
            fallback={
              <Card className="p-6 text-center border-border/60">
                <p className="text-muted-foreground text-sm">GitHub stats temporarily unavailable</p>
              </Card>
            }
          >
            <GitHubStats />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
