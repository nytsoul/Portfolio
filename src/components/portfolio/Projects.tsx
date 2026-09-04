import { AnimatePresence, motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useProjectCategories, useProjects } from "@/hooks/use-api";
import { ExternalLink, Github, Star, GitFork, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useInView } from "react-intersection-observer";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.04 });

  const categoriesData = useProjectCategories();
  const categories = (categoriesData.data ?? []) as string[];
  const projectsData = useProjects({
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });
  const projects = (projectsData.data ?? []) as any[];

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase();
    return (
      projects?.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.languages?.some((l: string) => l.toLowerCase().includes(q)) ||
          p.topics?.some((t: string) => t.toLowerCase().includes(q))
      ) ?? []
    );
  }, [projects, searchQuery]);

  const allCategories = ["all", ...(categories || [])];

  return (
    <div className="w-full px-6 lg:px-16" ref={ref}>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="section-label mb-4">Work</p>
        <h2 className="text-5xl lg:text-6xl font-bold">
          Selected{" "}
          <span className="italic gradient-text">Projects</span>
        </h2>
        <p className="text-base text-muted-foreground mt-4 max-w-lg leading-relaxed">
          A curated collection of work reflecting commitment to quality engineering, clean design, and real-world impact.
        </p>
      </motion.div>

      {/* ── Filters ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-10 font-ui"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8.5 pr-8 text-sm bg-card/50 border-border/55 h-9 rounded-md focus:border-primary/40"
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
              className={`px-3 py-1.5 text-[12px] font-medium rounded border capitalize transition-all duration-200 ${selectedCategory === cat
                ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/15"
                : "border-border/55 text-muted-foreground hover:border-border hover:text-foreground bg-transparent"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Grid ── */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
        {filteredProjects?.map((project: any, index: number) => (
          <motion.article
            key={project._id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="group flex flex-col bg-card/50 border border-border/55 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 active:border-primary/50 transition-all duration-300"
          >
            {/* Preview — live deployment screenshot */}
            <div className="relative aspect-[16/9] overflow-hidden bg-background/60 border-b border-border/40">
              <img
                src={project.image || "/images/project-web.png"}
                alt={`${project.name} preview`}
                loading="lazy"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.src.endsWith("/images/project-web.png")) t.src = "/images/project-web.png";
                }}
                className="w-full h-full object-cover object-top group-hover:scale-[1.06] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-80" />
              {project.homepage && (
                <span className="absolute top-3 right-3 font-ui flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-background/80 backdrop-blur border border-border/50 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-chart-3 animate-pulse" />
                  Live
                </span>
              )}
            </div>
            {/* Body */}
            <div className="p-4 flex-1">
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3
                    className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {project.name}
                  </h3>
                  {project.featured && (
                    <span className="font-ui inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded bg-primary/12 text-primary border border-primary/20 uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>
                {/* Stars + Forks */}
                <div className="font-ui flex items-center gap-3 text-[11px] text-muted-foreground shrink-0 mt-0.5">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" />{project.stars}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{project.forks}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {project.description || "No description available."}
              </p>

              {/* Tags */}
              <div className="font-ui flex flex-wrap gap-1.5">
                {[...project.languages.slice(0, 2), ...project.topics.slice(0, 2)].map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-background/70 border border-border/40 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="font-ui flex items-center gap-4 px-4 py-3 border-t border-border/40 bg-card/30">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                Source
              </a>
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[12px] text-primary hover:opacity-75 transition-opacity"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
              <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/40 font-medium">
                {project.category}
              </span>
            </div>
          </motion.article>
        ))}
        </AnimatePresence>
      </div>

      {/* Empty states */}
      {projects?.length === 0 && (
        <p className="font-ui text-center py-20 text-sm text-muted-foreground">No projects in this category.</p>
      )}
      {projects?.length > 0 && filteredProjects?.length === 0 && (
        <p className="font-ui text-center py-20 text-sm text-muted-foreground">
          No results.{" "}
          <button onClick={() => setSearchQuery("")} className="text-primary hover:underline">Clear</button>
        </p>
      )}
    </div>
  );
}
