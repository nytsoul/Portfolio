import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LOCAL_SKILLS = [
  { _id: "html", name: "HTML5", category: "Languages", strength: 93 },
  { _id: "css", name: "CSS3", category: "Languages", strength: 91 },
  { _id: "js", name: "JavaScript", category: "Languages", strength: 92 },
  { _id: "ts", name: "TypeScript", category: "Languages", strength: 95 },
  { _id: "java", name: "Java", category: "Languages", strength: 82 },
  { _id: "py", name: "Python", category: "Languages", strength: 85 },
  { _id: "c", name: "C", category: "Languages", strength: 80 },
  { _id: "cpp", name: "C++", category: "Languages", strength: 78 },
  { _id: "react", name: "React", category: "Frontend", strength: 90 },
  { _id: "next", name: "Next.js", category: "Frontend", strength: 88 },
  { _id: "tailwind", name: "Tailwind", category: "Frontend", strength: 92 },
  { _id: "bootstrap", name: "Bootstrap", category: "Frontend", strength: 85 },
  { _id: "node", name: "Node.js", category: "Backend", strength: 86 },
  { _id: "express", name: "Express", category: "Backend", strength: 84 },
  { _id: "firebase", name: "Firebase", category: "Backend", strength: 85 },
  { _id: "rest", name: "REST APIs", category: "Backend", strength: 88 },
  { _id: "mongoose", name: "Mongoose", category: "Backend", strength: 83 },
  { _id: "mysql", name: "MySQL", category: "Databases", strength: 85 },
  { _id: "mongo", name: "MongoDB", category: "Databases", strength: 87 },
  { _id: "postgres", name: "PostgreSQL", category: "Databases", strength: 78 },
  { _id: "sqlite", name: "SQLite", category: "Databases", strength: 82 },
  { _id: "supabase", name: "Supabase", category: "Databases", strength: 80 },
  { _id: "git", name: "Git", category: "Dev Tools", strength: 90 },
  { _id: "github", name: "GitHub", category: "Dev Tools", strength: 92 },
  { _id: "vscode", name: "VS Code", category: "Dev Tools", strength: 88 },
  { _id: "linux", name: "Linux", category: "Dev Tools", strength: 75 },
  { _id: "docker", name: "Docker", category: "Dev Tools", strength: 75 },
];

const CATEGORIES = ["Languages", "Frontend", "Backend", "Databases", "Dev Tools"];

function levelLabel(s: number) {
  if (s >= 90) return "Expert";
  if (s >= 80) return "Advanced";
  if (s >= 70) return "Proficient";
  return "Familiar";
}

function levelColor(s: number) {
  if (s >= 90) return "text-chart-1 border-chart-1/30 bg-chart-1/10";
  if (s >= 80) return "text-chart-3 border-chart-3/30 bg-chart-3/10";
  if (s >= 70) return "text-chart-2 border-chart-2/30 bg-chart-2/10";
  return "text-muted-foreground border-border/60 bg-muted/30";
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.04 });

  const byCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = LOCAL_SKILLS.filter((s) => s.category === cat);
    return acc;
  }, {} as Record<string, typeof LOCAL_SKILLS>);

  const avgStrength = Math.round(
    LOCAL_SKILLS.reduce((s, sk) => s + sk.strength, 0) / LOCAL_SKILLS.length
  );

  return (
    <div className="w-full px-6 lg:px-16" ref={ref}>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="section-label mb-4">Skills</p>
        <h2 className="text-5xl lg:text-6xl font-bold">
          Technologies &amp;{" "}
          <span className="italic gradient-text">Tools</span>
        </h2>
        <p className="text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">
          A curated set of technologies I've worked with across personal, academic, and collaborative projects.
        </p>
      </motion.div>

      {/* ── Skills by category ── */}
      <div className="space-y-12">
        {CATEGORIES.map((category, catIdx) => {
          const skills = byCategory[category] ?? [];
          if (!skills.length) return null;
          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: catIdx * 0.07 }}
            >
              {/* Category row */}
              <div className="flex items-center gap-5 mb-5">
                <h3
                  className="font-ui text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground/70 shrink-0"
                >
                  {category}
                </h3>
                <div className="flex-1 h-px bg-border/40" />
                <span className="font-ui text-[10px] text-muted-foreground/40">{skills.length}</span>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 font-ui">
                {skills.map((skill, idx) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.28, delay: catIdx * 0.06 + idx * 0.035 }}
                    whileHover={{ y: -2 }}
                    className="group flex items-center gap-2.5 px-3.5 py-2 rounded-md border border-border/55 bg-card/50 cursor-default hover:border-primary/35 hover:bg-card/80 transition-all duration-200"
                  >
                    {/* 5-dot strength indicator */}
                    <div className="flex items-end gap-[3px] h-3.5">
                      {[...Array(5)].map((_, i) => {
                        const filled = i < Math.round(skill.strength / 20);
                        return (
                          <div
                            key={i}
                            className={`w-[3px] rounded-full transition-colors ${filled ? "bg-primary/70" : "bg-border/50"
                              }`}
                            style={{ height: `${40 + i * 12}%` }}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[13px] font-medium text-foreground/90">{skill.name}</span>
                    {/* Level badge — appears on hover */}
                    <span
                      className={`text-[9px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded border opacity-0 group-hover:opacity-100 transition-opacity ${levelColor(skill.strength)}`}
                    >
                      {levelLabel(skill.strength)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* ── Summary stat bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16 grid grid-cols-3 gap-0 border border-border/50 rounded-lg overflow-hidden font-ui"
      >
        {[
          { value: LOCAL_SKILLS.length, label: "Technologies" },
          { value: `${avgStrength}%`, label: "Avg. Proficiency" },
          { value: CATEGORIES.length, label: "Domains" },
        ].map(({ value, label }, i) => (
          <div
            key={label}
            className={`flex flex-col items-center justify-center py-8 gap-1 bg-card/40 ${i < 2 ? "border-r border-border/50" : ""
              }`}
          >
            <span
              className="text-3xl font-bold gradient-text"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {value}
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60">
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
