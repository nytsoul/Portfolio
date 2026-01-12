import { motion } from "framer-motion";
import { Github, Mail, Linkedin, MapPin, ExternalLink, Calendar, Award, Heart, Coffee, Zap, Code2 } from "lucide-react";
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
        className="max-w-7xl mx-auto w-full"
      >
        {/* Enhanced Profile Card */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card className="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/50 to-card/90 backdrop-blur-xl border-border/50 shadow-2xl">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-chart-2/5 rounded-full blur-3xl" />

            <div className="relative p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Enhanced Profile Image */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-full blur-xl" />
                  <Avatar className="relative w-32 h-32 lg:w-40 lg:h-40 ring-4 ring-primary/30 ring-offset-4 ring-offset-background shadow-xl">
                    <AvatarImage src={profile?.profileImage || "/profile.jpg"} className="object-cover" />
                    <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-chart-2 text-primary-foreground">
                      {profile?.name?.split(" ").map((n: string) => n[0]).join("") || "NR"}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online Status Indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-background rounded-full"
                  />
                </motion.div>

                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                      {profile?.name || "Neshun R"}
                    </h1>
                    <motion.div
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                      className="text-3xl"
                    >
                      👋
                    </motion.div>
                  </div>

                  {profile?.location && (
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                      <span className="text-lg">🇮🇳</span>
                    </div>
                  )}

                  {/* Animated Tagline */}
                  <div className="min-h-[70px] mb-6">
                    <TypeWriter
                      texts={[
                        "💻 Full-stack developer passionate about AI",
                        "🔒 Building scalable and secure systems",
                        "🛡️ Cybersecurity enthusiast and problem solver",
                        "🚀 Creating innovative tech solutions",
                      ]}
                      typingSpeed={50}
                      deletingSpeed={30}
                      pauseDuration={2500}
                      className="text-xl lg:text-2xl text-primary font-semibold leading-relaxed"
                    />
                  </div>

                  {/* Quick Stats Badges */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                    <Badge variant="secondary" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                      <Code2 className="w-4 h-4 mr-2" />
                      Full-Stack Developer
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 text-sm bg-chart-2/10 text-chart-2 border-chart-2/20">
                      <Zap className="w-4 h-4 mr-2" />
                      AI Enthusiast
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 text-sm bg-chart-3/10 text-chart-3 border-chart-3/20">
                      <Award className="w-4 h-4 mr-2" />
                      Problem Solver
                    </Badge>
                  </div>

                  {/* Bio */}
                  <p className="text-foreground/80 leading-relaxed mb-6 max-w-2xl">
                    {profile?.bio ||
                      "🎓 2nd-year CS Engineering student at SSN College of Engineering. Building robust systems and solving real-world problems with a focus on user experience and architectural thinking."}
                  </p>

                  {/* Social Links - Enhanced */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {profile?.github && (
                      <Button variant="outline" size="sm" className="group" asChild>
                        <a
                          href={`https://github.com/${profile.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {profile?.email && (
                      <Button variant="outline" size="sm" className="group" asChild>
                        <a href={`mailto:${profile.email}`}>
                          <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Email
                        </a>
                      </Button>
                    )}
                    {profile?.linkedin && (
                      <Button variant="outline" size="sm" className="group" asChild>
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {profile?.website && (
                      <Button variant="outline" size="sm" className="group" asChild>
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid - Enhanced with Emojis */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 backdrop-blur">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">📦</div>
                  <Github className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {githubStats?.publicRepos || 0}
                </div>
                <div className="text-sm text-muted-foreground">Public Repositories</div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20 backdrop-blur">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">👥</div>
                  <Heart className="w-5 h-5 text-chart-2" />
                </div>
                <div className="text-3xl font-bold text-chart-2 mb-1">
                  {githubStats?.followers || 0}
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20 backdrop-blur">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">🤝</div>
                  <ExternalLink className="w-5 h-5 text-chart-3" />
                </div>
                <div className="text-3xl font-bold text-chart-3 mb-1">
                  {githubStats?.following || 0}
                </div>
                <div className="text-sm text-muted-foreground">Following</div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20 backdrop-blur">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">⭐</div>
                  <Award className="w-5 h-5 text-chart-4" />
                </div>
                <div className="text-3xl font-bold text-chart-4 mb-1">
                  {githubStats?.totalStars || 0}
                </div>
                <div className="text-sm text-muted-foreground">Total Stars</div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Fun Facts / Quick Info Cards */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4 mb-12">
          <Card className="p-4 bg-card/30 backdrop-blur border-border/50">
            <div className="flex items-center gap-3">
              <div className="text-2xl">☕</div>
              <div>
                <div className="text-sm text-muted-foreground">Powered by</div>
                <div className="font-semibold text-foreground">Coffee & Code</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/30 backdrop-blur border-border/50">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📍</div>
              <div>
                <div className="text-sm text-muted-foreground">Currently</div>
                <div className="font-semibold text-foreground">Open to Work</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/30 backdrop-blur border-border/50">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎯</div>
              <div>
                <div className="text-sm text-muted-foreground">Focus on</div>
                <div className="font-semibold text-foreground">AI & Security</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
              <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
