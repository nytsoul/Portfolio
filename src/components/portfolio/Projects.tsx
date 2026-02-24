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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const categoriesData = useProjectCategories() ?? ({} as any);
  const categories = categoriesData.data ?? [];
  const projectsData =
    useProjects({ category: selectedCategory === "all" ? undefined : selectedCategory }) ??
    ({} as any);
  const projects = projectsData.data ?? [];

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase();
    return (
      projects?.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.languages?.some((l: string) => l.toLowerCase().includes(query)) ||
          p.topics?.some((t: string) => t.toLowerCase().includes(query))
      ) ?? []
    );
  }, [projects, searchQuery]);

  const allCategories = ["all", ...(categories || [])];

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
          <p className="section-label">Work</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Selected
            <br />
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-base text-muted-foreground mt-4 max-w-xl">
            A curated collection of projects showcasing dedication to quality, clean architecture, and
            real-world impact.
          </p>
        </motion.div>

        {/* Search + Filter row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 bg-card/50 border-border/60 text-sm focus:border-primary/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 capitalize ${selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                    : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card/40"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProjects?.map((project: any, index: number) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-card/50 border-border/60 h-full flex flex-col overflow-hidden group hover:border-primary/30 transition-all duration-300">
                {/* Card header */}
                <div className="p-5 pb-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      {project.featured && (
                        <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/25 uppercase tracking-wide">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {project.forks}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {project.description || "No description available."}
                  </p>
                </div>

                {/* Tags */}
                <div className="px-5 flex flex-wrap gap-1.5 mb-4">
                  {[...project.languages.slice(0, 2), ...project.topics.slice(0, 2)].map(
                    (tag: string) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent/60 text-muted-foreground border border-border/40"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                {/* Footer / Actions */}
                <div className="mt-auto border-t border-border/40 px-5 py-4 flex items-center gap-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source
                  </a>
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">
                    {project.category}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {projects?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No projects found in this category.
          </div>
        )}

        {/* Search empty state */}
        {projects?.length > 0 && filteredProjects?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No projects match your search.{" "}
            <button onClick={() => setSearchQuery("")} className="text-primary hover:underline">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
