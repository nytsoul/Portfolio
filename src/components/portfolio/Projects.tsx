import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = useQuery(api.portfolio.getProjectCategories, {});
  const projects = useQuery(api.portfolio.getProjects, {
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
      }
    },
  };

  const allCategories = ["all", ...(categories || [])];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span></span>
            Projects
            <span></span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my skills across different
            domains. Each project reflects my commitment to quality and
            innovation. 
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, index) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur border-border h-full flex flex-col">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {project.name}
                    </h3>
                    <Badge variant="secondary" className="mb-2">
                      {project.category}
                    </Badge>
                  </div>
                  {project.featured && (
                    <Badge className="bg-primary/20 text-primary border-primary">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Project Description */}
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {project.description || "No description available"}
                </p>

                {/* Languages/Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.languages.slice(0, 3).map((lang: string) => (
                    <Badge
                      key={lang}
                      variant="outline"
                      className="text-xs"
                    >
                      {lang}
                    </Badge>
                  ))}
                  {project.topics.slice(0, 2).map((topic: string) => (
                    <Badge
                      key={topic}
                      variant="outline"
                      className="text-xs"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{project.forks}</span>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  {project.homepage && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {projects?.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 text-muted-foreground"
          >
            <p>No projects found in this category.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
