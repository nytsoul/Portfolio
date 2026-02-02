import { Card } from "@/components/ui/card";
import { Briefcase, Code, Trophy, GraduationCap } from "lucide-react";
import GitHubStats from "./GitHubStats";
import CompetitiveProgramming from "./CompetitiveProgramming";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function About() {
  const achievements = [];

  const defaultAchievements = (achievements ?? []).length > 0 ? achievements : [
    {
      title: "Experience",
      value: "2+ Years",
      description: "Building full-stack applications",
      icon: "Briefcase",
      order: 0,
    },
    {
      title: "Projects",
      value: "30+ Done",
      description: "Completed projects",
      icon: "Code",
      order: 1,
    },
    {
      title: "Codeforces",
      value: "300+",
      description: "Problems Solved",
      icon: "Trophy",
      order: 2,
    },
    {
      title: "GPA",
      value: "6.875",
      description: "Academic Performance",
      icon: "GraduationCap",
      order: 3,
    },
  ];

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Briefcase":
        return Briefcase;
      case "Code":
        return Code;
      case "Trophy":
        return Trophy;
      case "GraduationCap":
        return GraduationCap;
      default:
        return Code;
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

        {/* About Content */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Main Bio */}
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur border-primary/20">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  Who I Am
                </h3>
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p className="text-lg">
                    Hi! I'm <span className="font-semibold text-primary">Neshun R</span>, a passionate 2nd-year Computer Science Engineering student at 
                    <span className="font-medium"> SSN College of Engineering, Chennai</span>. 
                    I'm from India 🇮🇳 and I believe in the philosophy that <span className="italic text-chart-3">"Consistency beats motivation."</span>
                  </p>
                  <p>
                    My journey in technology started with a curiosity about how things work, and has evolved into a deep passion for 
                    building robust, scalable systems that solve real-world problems. I combine architectural thinking with a strong 
                    focus on user experience, ensuring that the solutions I create are both powerful and intuitive.
                  </p>
                  <p>
                    With expertise spanning full-stack development, AI integration, and cybersecurity, I'm constantly pushing the 
                    boundaries of what's possible with modern technology. I believe in writing clean, maintainable code and 
                    following best practices to deliver high-quality software.
                  </p>
                </div>
              </Card>
            </div>

            {/* Quick Facts */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-chart-2/10 to-chart-2/5 backdrop-blur border-chart-2/20">
                <h4 className="text-lg font-semibold text-chart-2 mb-4">Quick Facts</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">Chennai, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Education:</span>
                    <span className="font-medium">CS Engineering (2nd Year)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GPA:</span>
                    <span className="font-medium">6.875/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">1+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Problems Solved:</span>
                    <span className="font-medium">300+ (CodeForces)</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-chart-3/10 to-chart-3/5 backdrop-blur border-chart-3/20">
                <h4 className="text-lg font-semibold text-chart-3 mb-4">Current Focus</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Full-Stack Web Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                    <span>AI & Machine Learning Integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                    <span>Cybersecurity & Ethical Hacking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                    <span>Competitive Programming</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {defaultAchievements.map((achievement: any, index: number) => {
            const Icon = getIcon(achievement.icon);
            return (
              <div key={index}>
                <Card className="p-6 bg-card/50 backdrop-blur border-border h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">
                        {achievement.title}
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {achievement.value}
                      </div>
                      {achievement.description && (
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Expertise Areas */}
        <div className="mt-12 mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Areas of Expertise
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors">
              <h4 className="text-lg font-semibold text-primary mb-3">
                Full-Stack Development
              </h4>
              <p className="text-muted-foreground text-sm">
                Building end-to-end web applications with modern frameworks and
                technologies. From responsive frontends to scalable backends.
              </p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-chart-2/5 to-chart-2/10 backdrop-blur border-chart-2/20 hover:border-chart-2/40 transition-colors">
              <h4 className="text-lg font-semibold text-chart-2 mb-3">
                AI & Machine Learning
              </h4>
              <p className="text-muted-foreground text-sm">
                Integrating AI capabilities into applications, working with LLMs,
                and creating intelligent systems that enhance user experiences.
              </p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-chart-3/5 to-chart-3/10 backdrop-blur border-chart-3/20 hover:border-chart-3/40 transition-colors">
              <h4 className="text-lg font-semibold text-chart-3 mb-3">
                Cybersecurity
              </h4>
              <p className="text-muted-foreground text-sm">
                Passionate about security best practices, penetration testing,
                and building secure systems that protect user data.
              </p>
            </Card>
          </div>
        </div>

        {/* Competitive Programming */}
        <div className="mt-12 mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Competitive Programming
          </h3>
          <CompetitiveProgramming />
        </div>

        {/* GitHub Stats Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            GitHub Activity & Stats
          </h3>
          <ErrorBoundary fallback={
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">GitHub stats temporarily unavailable</p>
            </Card>
          }>
            <GitHubStats />
          </ErrorBoundary>
        </div>
        </div>
      </div>
    </div>
  );
}
