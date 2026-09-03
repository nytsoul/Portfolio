"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Target, Award, ExternalLink } from "lucide-react";
import { env } from "@/lib/env";

export default function CompetitiveProgramming() {
  const codeforcesUsername = env.competitive.codeforces.username;
  const leetcodeUsername = env.competitive.leetcode.username;
  const problemsSolved = env.competitive.codeforces.problemsSolved;

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

  const stats = [
    {
      title: "Problems Solved",
      value: `${problemsSolved}+`,
      description: "Across different platforms",
      icon: Code,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "CodeForces",
      value: codeforcesUsername || "nytsoul",
      description: "Competitive Programming",
      icon: Zap,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      href: `https://codeforces.com/profile/${codeforcesUsername || "nytsoul"}`,
    },
    {
      title: "LeetCode",
      value: leetcodeUsername || "nyt__soul",
      description: "Algorithm Practice",
      icon: Target,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
      href: `https://leetcode.com/${leetcodeUsername || "nyt__soul"}`,
    },
    {
      title: "Active Contests",
      value: "Regular",
      description: "Participating in contests",
      icon: Award,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        const card = (
          <Card className="glass-card border-primary/20 h-full group hover:border-primary/40 transition-colors">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color} flex items-center justify-center gap-1.5`}>
                    {stat.value}
                    {"href" in stat && stat.href && (
                      <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-opacity" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {stat.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {"href" in stat && stat.href ? "View Profile" : stat.description}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        return (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {"href" in stat && stat.href ? (
              <a href={stat.href} target="_blank" rel="noopener noreferrer" aria-label={`${stat.title} profile`} className="block h-full">
                {card}
              </a>
            ) : (
              card
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}