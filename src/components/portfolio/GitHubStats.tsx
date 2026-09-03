"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Trophy, Target, GitFork, Star, Users, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import { useGitHubStats, useProjects } from "@/hooks/use-api";
import { ProcessedProject, GitHubStats as GitHubStatsType } from "@/lib/github-service";
import { env } from "@/lib/env";

export default function GitHubStats() {
  const username = env.github.username;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const { data: statsData } = useGitHubStats(username) as { data: GitHubStatsType | null };
  const { data: projectsData } = useProjects() as { data: ProcessedProject[] | undefined };

  const stats = statsData || null;
  const projects = projectsData || [];

  const handleImageError = (imageType: string) => {
    setImageErrors(prev => ({ ...prev, [imageType]: true }));
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

  const totals = useMemo(() => {
    if (!projects.length) return { stars: 0, forks: 0 };
    return projects.reduce((acc: any, p: any) => ({
      stars: acc.stars + (p.stars || 0),
      forks: acc.forks + (p.forks || 0),
    }), { stars: 0, forks: 0 });
  }, [projects]);

  const hasLive = projects.length > 0 || (stats?.publicRepos ?? 0) > 0;
  const displayStats = {
    repos: stats?.publicRepos || projects.length || "–",
    stars: stats?.totalStars ?? (hasLive ? totals.stars : "–"),
    followers: stats?.followers ?? (hasLive ? 0 : "–"),
    forks: stats?.totalForks ?? (hasLive ? totals.forks : "–"),
  };

  // Top languages across live projects — no hardcoded list
  const topLanguages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects as any[]) {
      for (const lang of p.languages ?? []) counts.set(lang, (counts.get(lang) ?? 0) + 1);
      for (const topic of (p.topics ?? []).slice(0, 3)) {
        const name = String(topic).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        counts.set(name, (counts.get(name) ?? 0) + 0.5);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name]) => name);
  }, [projects]);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-card/50 to-card/20 border border-border/50">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* GitHub Profile Link */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">GitHub Profile</h3>
                  <p className="text-muted-foreground">@{username}</p>
                </div>
              </div>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Profile
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* GitHub Stats Overview */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-chart-3/10">
                <Trophy className="w-5 h-5 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold">GitHub Overview</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
              <StatCard title="Repositories" value={displayStats.repos} icon={GitFork} color="bg-primary/10" />
              <StatCard title="Stars Received" value={displayStats.stars} icon={Star} color="bg-chart-5/10" />
              <StatCard title="Total Forks" value={displayStats.forks} icon={GitFork} color="bg-chart-2/10" />
              <StatCard title="Followers" value={displayStats.followers} icon={Users} color="bg-primary/10" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* GitHub Contribution Graph */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">GitHub Activity</h3>
            </div>
            {!imageErrors.activity ? (
              <div className="relative rounded-lg overflow-hidden bg-card/50">
                <img
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=tokyo-night&bg_color=1a1b27&color=38bdae&line=38bdae&point=80d4ff&area=true`}
                  alt="GitHub Contribution Graph"
                  className="w-full h-auto"
                  loading="lazy"
                  onError={() => handleImageError('activity')}
                />
              </div>
            ) : (
              <div className="bg-card/50 rounded-lg p-8 text-center">
                <Code2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  GitHub contribution graph temporarily unavailable
                </p>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
                >
                  View on GitHub <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Languages & Technologies */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-chart-4/10">
                <Target className="w-5 h-5 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold">Primary Technologies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(topLanguages.length > 0 ? topLanguages : ["TypeScript"]).map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
