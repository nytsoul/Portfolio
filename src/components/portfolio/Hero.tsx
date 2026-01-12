import { motion } from "framer-motion";
import { Github, Mail, Linkedin, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import TypeWriter from "./TypeWriter";

interface HeroProps {
  profile: any;
  githubStats: any;
}

export default function Hero({ profile, githubStats }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24 ring-2 ring-primary ring-offset-2 ring-offset-background">
                <AvatarImage src={profile?.profileImage || "/profile.jpg"} />
                <AvatarFallback className="text-2xl">
                  {profile?.name?.split(" ").map((n: string) => n[0]).join("") || "NR"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  {profile?.name || "Neshun R"}
                </h1>
                {profile?.location && (
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            <motion.div variants={itemVariants} className="min-h-[60px]">
              <TypeWriter
                texts={[
                  "Full-stack developer passionate about AI",
                  "Building scalable and secure systems",
                  "Cybersecurity enthusiast and problem solver",
                  "Creating innovative tech solutions",
                ]}
                typingSpeed={50}
                deletingSpeed={30}
                pauseDuration={2500}
                className="text-xl text-primary font-medium leading-relaxed"
              />
            </motion.div>

            <motion.p variants={itemVariants} className="text-foreground/90 leading-relaxed">
              {profile?.bio ||
                "2nd-year CS Engineering student at SSN College of Engineering. Building robust systems and solving real-world problems with a focus on user experience and architectural thinking."}
            </motion.p>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {profile?.github && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://github.com/${profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {profile?.email && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
              )}
              {profile?.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              )}
              {profile?.website && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - GitHub Stats */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
                <Github className="w-5 h-5 text-primary" />
                GitHub Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-secondary/50 rounded-lg p-4 text-center"
                >
                  <div className="text-3xl font-bold text-primary">
                    {githubStats?.publicRepos || 0}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Public Repos
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-secondary/50 rounded-lg p-4 text-center"
                >
                  <div className="text-3xl font-bold text-chart-2">
                    {githubStats?.followers || 0}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Followers
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-secondary/50 rounded-lg p-4 text-center"
                >
                  <div className="text-3xl font-bold text-chart-3">
                    {githubStats?.following || 0}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Following
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-secondary/50 rounded-lg p-4 text-center"
                >
                  <div className="text-3xl font-bold text-chart-4">
                    {githubStats?.totalStars || 0}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Total Stars
                  </div>
                </motion.div>
              </div>

              {githubStats?.lastUpdated && (
                <div className="mt-4 text-xs text-muted-foreground text-center">
                  Last updated:{" "}
                  {new Date(githubStats.lastUpdated).toLocaleDateString()}
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1"
          >
            <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
