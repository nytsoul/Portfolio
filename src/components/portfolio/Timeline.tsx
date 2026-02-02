import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface TimelineItem {
  type: "work" | "education";
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
}

const timelineData: TimelineItem[] = [
  {
    type: "education",
    title: "B.Tech in Computer Science",
    organization: "SSN College of Engineering",
    location: "Chennai, India",
    period: "2023 - Present",
    description: [
      "Currently pursuing Bachelor's degree in Computer Science and Engineering",
      "CGPA: 6.875/10",
      "Focused on algorithms, data structures, and full-stack development",
    ],
  },
  {
    type: "work",
    title: "Full-Stack Developer",
    organization: "Personal Projects",
    location: "Remote",
    period: "2023 - Present",
    description: [
      "Built 10+ full-stack applications using modern technologies",
      "Specialized in React, Next.js, Node.js, and MongoDB",
      "Implemented secure authentication and RESTful APIs",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    type: "work",
    title: "Competitive Programmer",
    organization: "Codeforces",
    location: "Online",
    period: "2022 - Present",
    description: [
      "Solved 300+ problems on Codeforces",
      "Strong problem-solving and algorithmic thinking skills",
      "Regular participation in coding contests",
    ],
    technologies: ["C++", "Algorithms", "Data Structures"],
  },
];

export default function Timeline() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Timeline
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My journey through education and experience
            </p>
          </motion.div>

          {/* Timeline Items */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-chart-2 to-chart-5" />

            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-chart-2 ring-4 ring-background z-10"
                    whileHover={{ scale: 1.5 }}
                  />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                      index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    <Card className="glass p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
                      {/* Icon */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`p-3 rounded-lg ${
                            item.type === "work"
                              ? "bg-primary/10 text-primary"
                              : "bg-chart-3/10 text-chart-3"
                          }`}
                        >
                          {item.type === "work" ? (
                            <Briefcase className="w-5 h-5" />
                          ) : (
                            <GraduationCap className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {item.title}
                          </h3>
                          <p className="text-primary font-semibold mb-1">
                            {item.organization}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{item.period}</span>
                            <span>•</span>
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {item.description.map((desc, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">▸</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      {item.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
