import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Trophy, Target, GitFork, Star, Users, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function GitHubStats() {
  const username = import.meta.env.VITE_GITHUB_USERNAME || "nytsoul";
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

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

  // Fallback stats data
  const fallbackStats = {
    repos: "30+",
    commits: "500+", 
    prs: "50+",
    issues: "25+",
    stars: "100+",
    followers: "50+"
  };

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
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard title="Repositories" value={fallbackStats.repos} icon={GitFork} color="bg-primary/10" />
              <StatCard title="Commits" value={fallbackStats.commits} icon={Code2} color="bg-chart-2/10" />
              <StatCard title="Pull Requests" value={fallbackStats.prs} icon={Target} color="bg-chart-3/10" />
              <StatCard title="Issues" value={fallbackStats.issues} icon={Users} color="bg-chart-4/10" />
              <StatCard title="Stars Received" value={fallbackStats.stars} icon={Star} color="bg-chart-5/10" />
              <StatCard title="Followers" value={fallbackStats.followers} icon={Users} color="bg-primary/10" />
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
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'MongoDB', 'PostgreSQL'].map((tech) => (
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