import { motion } from "framer-motion";
import { useAchievements } from "@/hooks/use-api";
import { Card } from "@/components/ui/card";
import { Briefcase, Code, Trophy, GraduationCap } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function About() {
  const achievementData = useAchievements() ?? {} as any;
  const achievements = achievementData.data ?? [];
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      }
    },
  };

  const defaultAchievements = (achievements ?? []).length > 0 ? achievements : [
    {
      title: "Experience",
      value: "1+ Years",
      description: "Building full-stack applications",
      icon: "Briefcase",
      order: 0,
    },
    {
      title: "Projects",
      value: "10 Done",
      description: "Completed projects",
      icon: "Code",
      order: 1,
    },
    {
      title: "Codeforces",
      value: "300+",
      description: "Problems Solved",
      icon: "Trophy",
      order: 2,
    },
    {
      title: "GPA",
      value: "6.875",
      description: "Academic Performance",
      icon: "GraduationCap",
      order: 3,
    },
  ];

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Briefcase":
        return Briefcase;
      case "Code":
        return Code;
      case "Trophy":
        return Trophy;
      case "GraduationCap":
        return GraduationCap;
      default:
        return Code;
    }
  };

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
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              About Me
            </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        {/* About Content */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card className="p-8 bg-card/50 backdrop-blur border-border">
            <p className="text-lg text-foreground/90 leading-relaxed">
              I'm a 2nd-year Computer Science Engineering student at SSN College
              of Engineering, Chennai. My passion lies in building robust,
              scalable systems that solve real-world problems. I combine
              architectural thinking with a strong focus on user experience,
              ensuring that the solutions I create are both powerful and
              intuitive.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed mt-4">
              With expertise spanning full-stack development, AI integration,
              and cybersecurity, I'm constantly pushing the boundaries of what's
              possible with modern technology. I believe in writing clean,
              maintainable code and following best practices to deliver
              high-quality software.
            </p>
          </Card>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultAchievements.map((achievement: any, index: number) => {
            const Icon = getIcon(achievement.icon);
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur border-border h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">
                        {achievement.title}
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {achievement.value}
                      </div>
                      {achievement.description && (
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Expertise Areas */}
        <motion.div variants={itemVariants} className="mt-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Areas of Expertise
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors">
              <h4 className="text-lg font-semibold text-primary mb-3">
                Full-Stack Development
              </h4>
              <p className="text-muted-foreground text-sm">
                Building end-to-end web applications with modern frameworks and
                technologies. From responsive frontends to scalable backends.
              </p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-chart-2/5 to-chart-2/10 backdrop-blur border-chart-2/20 hover:border-chart-2/40 transition-colors">
              <h4 className="text-lg font-semibold text-chart-2 mb-3">
                AI & Machine Learning
              </h4>
              <p className="text-muted-foreground text-sm">
                Integrating AI capabilities into applications, working with LLMs,
                and creating intelligent systems that enhance user experiences.
              </p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-chart-3/5 to-chart-3/10 backdrop-blur border-chart-3/20 hover:border-chart-3/40 transition-colors">
              <h4 className="text-lg font-semibold text-chart-3 mb-3">
                Cybersecurity
              </h4>
              <p className="text-muted-foreground text-sm">
                Passionate about security best practices, penetration testing,
                and building secure systems that protect user data.
              </p>
            </Card>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
