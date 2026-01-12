import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedPortfolioData = mutation({
  args: {},
  handler: async (ctx) => {
    // Get the first user or create a dummy one
    const users = await ctx.db.query("users").take(1);
    let userId;

    if (users.length === 0) {
      // Create a test user
      userId = await ctx.db.insert("users", {
        name: "Neshun R",
        email: "neshun7413@gmail.com",
      });
    } else {
      userId = users[0]._id;
    }

    // Create profile
    const existingProfile = await ctx.db
      .query("profile")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!existingProfile) {
      await ctx.db.insert("profile", {
        userId,
        name: "Neshun R",
        location: "Chennai",
        bio: "2nd-year CS Engineering student at SSN College of Engineering. Passionate about building robust systems and solving real-world problems with a focus on user experience and architectural thinking.",
        tagline:
          "Full-stack developer passionate about AI, cybersecurity, and building scalable systems",
        profileImage: "/profile.jpg",
        email: "neshun7413@gmail.com",
        website: "https://alexchen.dev",
        github: "nytsoul",
      });
    }

    // Create GitHub stats
    const existingStats = await ctx.db
      .query("githubStats")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!existingStats) {
      await ctx.db.insert("githubStats", {
        userId,
        username: "nytsoul",
        publicRepos: 25,
        followers: 892,
        following: 156,
        totalStars: 150,
        lastUpdated: Date.now(),
      });
    }

    // Create sample projects
    const existingProjects = await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .take(1);

    if (existingProjects.length === 0) {
      const projects = [
        {
          userId,
          name: "AI-Powered Task Manager",
          description:
            "A smart task management app with AI-powered prioritization and scheduling",
          category: "Web Development",
          languages: ["TypeScript", "React"],
          topics: ["ai", "productivity", "web-app"],
          stars: 45,
          forks: 12,
          url: "https://github.com/nytsoul/ai-task-manager",
          featured: true,
          lastUpdated: Date.now(),
        },
        {
          userId,
          name: "Secure Chat Application",
          description:
            "End-to-end encrypted chat with modern security practices",
          category: "Cybersecurity",
          languages: ["Python", "JavaScript"],
          topics: ["security", "encryption", "chat"],
          stars: 38,
          forks: 8,
          url: "https://github.com/nytsoul/secure-chat",
          featured: true,
          lastUpdated: Date.now(),
        },
        {
          userId,
          name: "Algorithm Visualizer",
          description: "Interactive visualization tool for common algorithms",
          category: "Competitive Programming",
          languages: ["JavaScript", "React"],
          topics: ["algorithms", "visualization", "education"],
          stars: 62,
          forks: 15,
          url: "https://github.com/nytsoul/algo-viz",
          featured: true,
          lastUpdated: Date.now(),
        },
        {
          userId,
          name: "REST API Framework",
          description: "Lightweight framework for building RESTful APIs",
          category: "Backend",
          languages: ["Node.js", "TypeScript"],
          topics: ["api", "backend", "framework"],
          stars: 28,
          forks: 6,
          url: "https://github.com/nytsoul/rest-framework",
          featured: false,
          lastUpdated: Date.now() - 86400000 * 30,
        },
        {
          userId,
          name: "ML Model Trainer",
          description: "Automated ML model training pipeline",
          category: "Machine Learning",
          languages: ["Python"],
          topics: ["machine-learning", "automation", "ai"],
          stars: 19,
          forks: 4,
          url: "https://github.com/nytsoul/ml-trainer",
          featured: false,
          lastUpdated: Date.now() - 86400000 * 60,
        },
        {
          userId,
          name: "DevOps Dashboard",
          description: "Monitoring dashboard for DevOps workflows",
          category: "DevOps",
          languages: ["TypeScript", "React"],
          topics: ["devops", "monitoring", "dashboard"],
          stars: 31,
          forks: 9,
          url: "https://github.com/nytsoul/devops-dashboard",
          featured: false,
          lastUpdated: Date.now() - 86400000 * 45,
        },
      ];

      for (const project of projects) {
        await ctx.db.insert("projects", project);
      }
    }

    // Create sample skills
    const existingSkills = await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .take(1);

    if (existingSkills.length === 0) {
      const skills = [
        {
          userId,
          name: "TypeScript",
          category: "Languages",
          strength: 100,
          usageCount: 15,
          lastUsed: Date.now(),
        },
        {
          userId,
          name: "Python",
          category: "Languages",
          strength: 95,
          usageCount: 12,
          lastUsed: Date.now() - 86400000 * 10,
        },
        {
          userId,
          name: "JavaScript",
          category: "Languages",
          strength: 90,
          usageCount: 18,
          lastUsed: Date.now() - 86400000 * 5,
        },
        {
          userId,
          name: "React",
          category: "Frameworks",
          strength: 100,
          usageCount: 10,
          lastUsed: Date.now(),
        },
        {
          userId,
          name: "Node.js",
          category: "Frameworks",
          strength: 85,
          usageCount: 8,
          lastUsed: Date.now() - 86400000 * 15,
        },
        {
          userId,
          name: "Express",
          category: "Frameworks",
          strength: 80,
          usageCount: 6,
          lastUsed: Date.now() - 86400000 * 20,
        },
        {
          userId,
          name: "Docker",
          category: "Tools",
          strength: 75,
          usageCount: 7,
          lastUsed: Date.now() - 86400000 * 12,
        },
        {
          userId,
          name: "Git",
          category: "Tools",
          strength: 100,
          usageCount: 20,
          lastUsed: Date.now(),
        },
        {
          userId,
          name: "PostgreSQL",
          category: "Tools",
          strength: 70,
          usageCount: 5,
          lastUsed: Date.now() - 86400000 * 30,
        },
        {
          userId,
          name: "AWS",
          category: "Cloud",
          strength: 65,
          usageCount: 4,
          lastUsed: Date.now() - 86400000 * 25,
        },
      ];

      for (const skill of skills) {
        await ctx.db.insert("skills", skill);
      }
    }

    // Create achievements
    const existingAchievements = await ctx.db
      .query("achievements")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .take(1);

    if (existingAchievements.length === 0) {
      const achievements = [
        {
          userId,
          title: "Experience",
          value: "1+ Years",
          description: "Building full-stack applications",
          icon: "Briefcase",
          order: 0,
        },
        {
          userId,
          title: "Projects",
          value: "10 Done",
          description: "Completed projects",
          icon: "Code",
          order: 1,
        },
        {
          userId,
          title: "Codeforces",
          value: "300+",
          description: "Problems Solved",
          icon: "Trophy",
          order: 2,
        },
        {
          userId,
          title: "GPA",
          value: "6.875",
          description: "Academic Performance",
          icon: "GraduationCap",
          order: 3,
        },
      ];

      for (const achievement of achievements) {
        await ctx.db.insert("achievements", achievement);
      }
    }

    return {
      success: true,
      message: "Portfolio data seeded successfully!",
      userId,
    };
  },
});
