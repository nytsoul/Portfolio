import { motion } from "framer-motion";
import { useState } from "react";
import { useSkillCategories, useSkills } from "@/hooks/use-api";
import { useInView } from "react-intersection-observer";
const LOCAL_SKILLS = [
  // Languages
  { _id: "html", name: "HTML5", category: "Languages", strength: 93, icon: "📄" },
  { _id: "css", name: "CSS3", category: "Languages", strength: 91, icon: "🎨" },
  { _id: "js", name: "JavaScript", category: "Languages", strength: 92, icon: "⚡" },
  { _id: "ts", name: "TypeScript", category: "Languages", strength: 95, icon: "🔷" },
  { _id: "java", name: "Java", category: "Languages", strength: 82, icon: "☕" },
  { _id: "py", name: "Python", category: "Languages", strength: 85, icon: "🐍" },
  { _id: "c", name: "C", category: "Languages", strength: 80, icon: "⚙️" },
  { _id: "cpp", name: "C++", category: "Languages", strength: 78, icon: "🔧" },

  // Frontend
  { _id: "react", name: "React", category: "Frontend", strength: 90, icon: "⚛️" },
  { _id: "next", name: "Next.js", category: "Frontend", strength: 88, icon: "➡️" },
  { _id: "tailwind", name: "Tailwind CSS", category: "Frontend", strength: 92, icon: "🌬️" },
  { _id: "bootstrap", name: "Bootstrap", category: "Frontend", strength: 85, icon: "🅱️" },

  // Backend
  { _id: "node", name: "Node.js", category: "Backend", strength: 86, icon: "🟢" },
  { _id: "express", name: "Express.js", category: "Backend", strength: 84, icon: "🚀" },

  // Databases
  { _id: "mysql", name: "MySQL", category: "Databases", strength: 85, icon: "🐬" },
  { _id: "mongo", name: "MongoDB", category: "Databases", strength: 87, icon: "🍀" },
  { _id: "postgres", name: "PostgreSQL", category: "Databases", strength: 78, icon: "🐘" },
  { _id: "sqlite", name: "SQLite", category: "Databases", strength: 82, icon: "💾" },
  { _id: "supabase", name: "Supabase", category: "Databases", strength: 80, icon: "⚡" },

  // Dev Tools
  { _id: "git", name: "Git", category: "Dev Tools", strength: 90, icon: "🔧" },
  { _id: "github", name: "GitHub", category: "Dev Tools", strength: 92, icon: "🐙" },
  { _id: "vscode", name: "VS Code", category: "Dev Tools", strength: 88, icon: "💻" },
  { _id: "linux", name: "Linux", category: "Dev Tools", strength: 75, icon: "🐧" },

  // Additional Tools & Frameworks
  { _id: "docker", name: "Docker", category: "Dev Tools", strength: 75, icon: "🐳" },
  { _id: "firebase", name: "Firebase", category: "Backend", strength: 85, icon: "🔥" },
  { _id: "rest", name: "REST APIs", category: "Backend", strength: 88, icon: "🔗" },
  { _id: "mongoose", name: "Mongoose", category: "Backend", strength: 83, icon: "🍃" },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categoriesData = useSkillCategories() ?? {} as any;
  const categories = ["Languages", "Frontend", "Backend", "Databases", "Dev Tools"];
  const skills = LOCAL_SKILLS ?? [];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
      }
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 12,
      }
    },
  };

  const allCategories = ["all", ...(categories || [])];

  // Group skills by category
  const skillsByCategory = (skills ?? []).reduce((acc: Record<string, any>, skill: any) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">##</span>
            <span className="text-4xl">⚙️</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Skills and Language
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of technologies and tools I've mastered throughout my journey
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-16">
          {Object.entries(skillsByCategory).map(([category, categorySkills]: [string, any]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-foreground">{category}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              {/* Skills Grid for Category */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill._id}
                    variants={skillItemVariants}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      className="group relative flex flex-col items-center justify-center w-20 h-20 cursor-pointer mb-3"
                      whileHover={{ scale: 1.1, y: -8 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Skill Icon Container */}
                      <div className="relative w-20 h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl flex items-center justify-center border border-primary/30 shadow-lg group-hover:shadow-primary/30 transition-all duration-300 group-hover:border-primary/60">
                        <span className="text-4xl">
                          {(skill as any).icon || '⚡'}
                        </span>

                        {/* Glow Effect on Hover */}
                        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
                      </div>

                      {/* Strength Badge */}
                      <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-gradient-to-br from-primary to-primary/70 text-white text-xs font-bold rounded-full shadow-lg">
                        {Math.round(skill.strength / 10)}
                      </div>
                    </motion.div>

                    {/* Skill Name and Strength */}
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">
                        {skill.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {skill.strength}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {!skills || skills.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 text-muted-foreground"
          >
            <p>No skills found. Let me sync your GitHub data!</p>
          </motion.div>
        )}

        {/* Stats Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-20 p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl border border-primary/20"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary mb-2">
                {skills?.length || 0}
              </p>
              <p className="text-muted-foreground">Total Skills</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">
                {Math.round(
                  ((skills?.reduce((sum, s) => sum + s.strength, 0) || 0) /
                    (skills?.length || 1)) || 0
                )}
              </p>
              <p className="text-muted-foreground">Average Strength</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">
                {Object.keys(skillsByCategory).length}
              </p>
              <p className="text-muted-foreground">Categories</p>
            </div>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
