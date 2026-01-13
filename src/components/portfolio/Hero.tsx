import { motion } from "framer-motion";
import { Github, Mail, Linkedin, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        {/* Profile Section - Image Left, Info Right */}
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start mb-12">
          {/* Left Column - Profile Image Only */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <Avatar className="w-48 h-48 lg:w-56 lg:h-56 ring-4 ring-primary/20 ring-offset-4 ring-offset-background shadow-2xl shadow-primary/10">
              <AvatarImage src={profile?.profileImage || "/profile.jpg"} className="object-cover" />
              <AvatarFallback className="text-5xl font-bold bg-gradient-to-br from-primary to-primary/50">
                {profile?.name?.split(" ").map((n: string) => n[0]).join("") || "NR"}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Right Column - Name and Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight">
                {profile?.name || "Neshun R"}
              </h1>
              {profile?.location && (
                <div className="flex items-center gap-2 mt-3 text-muted-foreground text-lg">
                  <MapPin className="w-5 h-5" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            <motion.div variants={itemVariants} className="min-h-[70px]">
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
                className="text-2xl text-primary font-semibold leading-relaxed"
              />
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-foreground/80 leading-relaxed max-w-2xl">
              {profile?.bio ||
                "2nd-year CS Engineering student at SSN College of Engineering. Building robust systems and solving real-world problems with a focus on user experience and architectural thinking."}
            </motion.p>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
              {profile?.github && (
                <Button variant="outline" size="default" asChild>
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
                <Button variant="outline" size="default" asChild>
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
              )}
              {profile?.linkedin && (
                <Button variant="outline" size="default" asChild>
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
                <Button variant="outline" size="default" asChild>
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
        </div>

        {/* GitHub Stats - Full Width Below */}
        <motion.div variants={itemVariants} className="mt-12">
          <Card className="p-8 bg-card/50 backdrop-blur border-border">
            <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3">
              <Github className="w-6 h-6 text-primary" />
              GitHub Statistics
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center border border-primary/20"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {githubStats?.publicRepos || 0}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Public Repos
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
                className="bg-gradient-to-br from-chart-2/10 to-chart-2/5 rounded-xl p-6 text-center border border-chart-2/20"
              >
                <div className="text-4xl lg:text-5xl font-bold text-chart-2 mb-2">
                  {githubStats?.followers || 0}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Followers
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
                className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 rounded-xl p-6 text-center border border-chart-3/20"
              >
                <div className="text-4xl lg:text-5xl font-bold text-chart-3 mb-2">
                  {githubStats?.following || 0}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Following
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
                className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 rounded-xl p-6 text-center border border-chart-4/20"
              >
                <div className="text-4xl lg:text-5xl font-bold text-chart-4 mb-2">
                  {githubStats?.totalStars || 0}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Total Stars
                </div>
              </motion.div>
            </div>

            {githubStats?.lastUpdated && (
              <div className="mt-6 text-sm text-muted-foreground text-center">
                Last updated: {new Date(githubStats.lastUpdated).toLocaleDateString()}
              </div>
            )}
          </Card>
        </motion.div>

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
