import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LOCAL_SKILLS = [
  // Languages
  { _id: "html", name: "HTML5", category: "Languages", strength: 93 },
  { _id: "css", name: "CSS3", category: "Languages", strength: 91 },
  { _id: "js", name: "JavaScript", category: "Languages", strength: 92 },
  { _id: "ts", name: "TypeScript", category: "Languages", strength: 95 },
  { _id: "java", name: "Java", category: "Languages", strength: 82 },
  { _id: "py", name: "Python", category: "Languages", strength: 85 },
  { _id: "c", name: "C", category: "Languages", strength: 80 },
  { _id: "cpp", name: "C++", category: "Languages", strength: 78 },

  // Frontend
  { _id: "react", name: "React", category: "Frontend", strength: 90 },
  { _id: "next", name: "Next.js", category: "Frontend", strength: 88 },
  { _id: "tailwind", name: "Tailwind CSS", category: "Frontend", strength: 92 },
  { _id: "bootstrap", name: "Bootstrap", category: "Frontend", strength: 85 },

  // Backend
  { _id: "node", name: "Node.js", category: "Backend", strength: 86 },
  { _id: "express", name: "Express.js", category: "Backend", strength: 84 },
  { _id: "firebase", name: "Firebase", category: "Backend", strength: 85 },
  { _id: "rest", name: "REST APIs", category: "Backend", strength: 88 },
  { _id: "mongoose", name: "Mongoose", category: "Backend", strength: 83 },

  // Databases
  { _id: "mysql", name: "MySQL", category: "Databases", strength: 85 },
  { _id: "mongo", name: "MongoDB", category: "Databases", strength: 87 },
  { _id: "postgres", name: "PostgreSQL", category: "Databases", strength: 78 },
  { _id: "sqlite", name: "SQLite", category: "Databases", strength: 82 },
  { _id: "supabase", name: "Supabase", category: "Databases", strength: 80 },

  // Dev Tools
  { _id: "git", name: "Git", category: "Dev Tools", strength: 90 },
  { _id: "github", name: "GitHub", category: "Dev Tools", strength: 92 },
  { _id: "vscode", name: "VS Code", category: "Dev Tools", strength: 88 },
  { _id: "linux", name: "Linux", category: "Dev Tools", strength: 75 },
  { _id: "docker", name: "Docker", category: "Dev Tools", strength: 75 },
];

const CATEGORY_ORDER = ["Languages", "Frontend", "Backend", "Databases", "Dev Tools"];

function getStrengthLabel(s: number) {
  if (s >= 90) return "Expert";
  if (s >= 80) return "Advanced";
  if (s >= 70) return "Proficient";
  return "Familiar";
}

function getStrengthColor(s: number) {
  if (s >= 90) return "bg-chart-1/20 text-chart-1 border-chart-1/30";
  if (s >= 80) return "bg-chart-2/20 text-chart-2 border-chart-2/30";
  if (s >= 70) return "bg-chart-3/20 text-chart-3 border-chart-3/30";
  return "bg-muted text-muted-foreground border-border";
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const skillsByCategory = CATEGORY_ORDER.reduce((acc, cat) => {
    acc[cat] = LOCAL_SKILLS.filter((s) => s.category === cat);
    return acc;
  }, {} as Record<string, typeof LOCAL_SKILLS>);

  return (
    <div className="w-full px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="section-label">Skills</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Technologies &amp;
            <br />
            <span className="gradient-text">Tools</span>
          </h2>
        </motion.div>

        {/* Skills by category */}
        <div className="space-y-14">
          {CATEGORY_ORDER.map((category, catIdx) => {
            const skills = skillsByCategory[category] ?? [];
            if (!skills.length) return null;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
              >
                {/* Category label */}
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                    {category}
                  </h3>
                  <div className="flex-1 h-px bg-border/50" />
                  <span className="text-xs text-muted-foreground/60">{skills.length} tools</span>
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, idx) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: catIdx * 0.06 + idx * 0.04 }}
                      whileHover={{ y: -2, scale: 1.03 }}
                      className="group flex items-center gap-2 px-3.5 py-2 rounded-lg bg-card/60 border border-border/60 cursor-default hover:border-primary/40 hover:bg-card/90 transition-all duration-200"
                    >
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      {/* strength bar */}
                      <div className="flex items-center gap-1 ml-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-3 rounded-full transition-colors ${i < Math.round(skill.strength / 20)
                                ? "bg-primary/70"
                                : "bg-border/60"
                              }`}
                          />
                        ))}
                      </div>
                      {/* strength label on hover */}
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border opacity-0 group-hover:opacity-100 transition-opacity ${getStrengthColor(
                          skill.strength
                        )}`}
                      >
                        {getStrengthLabel(skill.strength)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-6 p-8 rounded-2xl border border-border/60 bg-card/30"
        >
          {[
            { value: LOCAL_SKILLS.length, label: "Total Skills" },
            {
              value:
                Math.round(
                  LOCAL_SKILLS.reduce((s, sk) => s + sk.strength, 0) / LOCAL_SKILLS.length
                ) + "%",
              label: "Avg. Proficiency",
            },
            { value: CATEGORY_ORDER.length, label: "Categories" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
