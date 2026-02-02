import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useProjectCategories, useProjects } from "@/hooks/use-api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, Github, Star, GitFork, Search, X } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categoriesData = useProjectCategories() ?? {} as any;
  const categories = categoriesData.data ?? [];
  const projectsData = useProjects({
    category: selectedCategory === "all" ? undefined : selectedCategory,
  }) ?? {} as any;
  const projects = projectsData.data ?? [];

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    
    const query = searchQuery.toLowerCase();
    return projects?.filter((project: any) => 
      project.name?.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query) ||
      project.languages?.some((lang: string) => lang.toLowerCase().includes(query)) ||
      project.topics?.some((topic: string) => topic.toLowerCase().includes(query))
    ) ?? [];
  }, [projects, searchQuery]);

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
    <div className="w-full px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Projects
            </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my skills across different
            domains. Each project reflects my commitment to quality and
            innovation.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects by name, language, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 glass-light"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
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
          {filteredProjects?.map((project: any, index: number) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-card/50 backdrop-blur border-border h-full flex flex-col overflow-hidden">
                {/* Two Column Layout */}
                <div className="grid grid-cols-2 h-full">
                  {/* Left Column - Code Section */}
                  <div className="p-6 border-r border-border flex flex-col">
                    {/* Project Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {project.name}
                      </h3>
                      <Badge variant="secondary" className="mb-3">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Languages/Topics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.languages.slice(0, 2).map((lang: string) => (
                        <Badge
                          key={lang}
                          variant="outline"
                          className="text-xs"
                        >
                          {lang}
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

                    {/* Code Button */}
                    <Button 
                      variant="outline" 
                      className="w-full mt-auto" 
                      asChild
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>

                  {/* Right Column - Website Section */}
                  <div className="p-6 flex flex-col justify-between">
                    {/* Featured Badge */}
                    <div>
                      {project.featured && (
                        <Badge className="bg-primary/20 text-primary border-primary mb-3">
                          Featured
                        </Badge>
                      )}
                      
                      {/* Project Description */}
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description || "No description available"}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2">
                        {project.topics.slice(0, 3).map((topic: string) => (
                          <Badge
                            key={topic}
                            variant="outline"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Website Demo Button */}
                    {project.homepage ? (
                      <Button
                        variant="outline"
                        className="w-full mt-auto"
                        asChild
                      >
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    ) : (
                      <div className="text-sm text-muted-foreground text-center mt-auto py-2">
                        No website available
                      </div>
                    )}
                  </div>
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
    </div>
  );
}
