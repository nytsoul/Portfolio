import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useInView } from "react-intersection-observer";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = useQuery(api.portfolio.getSkillCategories, {});
  const skills = useQuery(api.portfolio.getSkills, {
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
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
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I've worked with, automatically detected from
            my projects. Strength is calculated based on usage frequency and
            recency.
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

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills?.map((skill) => (
            <motion.div key={skill._id} variants={itemVariants}>
              <Card className="p-6 bg-card/50 backdrop-blur border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {skill.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {skill.strength}%
                  </div>
                </div>

                {/* Strength Bar */}
                <div className="mb-4">
                  <Progress value={skill.strength} className="h-2" />
                </div>

                {/* Usage Info */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Used in {skill.usageCount} projects</span>
                  <span>
                    Last used:{" "}
                    {new Date(skill.lastUsed).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {skills?.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 text-muted-foreground"
          >
            <p>No skills found in this category.</p>
          </motion.div>
        )}

        {/* Legend */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-6 bg-card/30 backdrop-blur rounded-lg border border-border"
        >
          <h4 className="text-sm font-semibold text-foreground mb-3">
            How skill strength is calculated
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              • <strong>Usage Frequency:</strong> Skills used in more projects
              get higher scores
            </li>
            <li>
              • <strong>Recency:</strong> Recently used skills are weighted more
              heavily
            </li>
            <li>
              • <strong>Relative Strength:</strong> Scores are normalized to show
              your strongest skills at 100%
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
