"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";

// Fetch GitHub user data and repos
export const fetchGitHubData = action({
  args: {
    username: v.string(),
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    try {
      // Fetch user stats
      const userResponse = await fetch(`https://api.github.com/users/${args.username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
      });

      if (!userResponse.ok) {
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }

      const userData = await userResponse.json();

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${args.username}/repos?per_page=100&sort=updated`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
      });

      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();

      // Save GitHub stats
      await ctx.runMutation(internal.githubMutations.saveGitHubStats, {
        userId: args.userId,
        username: args.username,
        publicRepos: userData.public_repos || 0,
        followers: userData.followers || 0,
        following: userData.following || 0,
      });

      // Process and categorize projects
      const processedProjects = repos
        .filter((repo: any) => !repo.fork && !repo.private)
        .map((repo: any) => {
          const category = categorizeProject(repo);
          const languages = repo.language ? [repo.language] : [];
          const topics = repo.topics || [];

          return {
            userId: args.userId,
            name: repo.name,
            description: repo.description || undefined,
            category,
            languages,
            topics,
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            url: repo.html_url,
            homepage: repo.homepage || undefined,
            featured: (repo.stargazers_count || 0) > 5, // Auto-feature repos with 5+ stars
            githubRepoId: repo.id,
            lastUpdated: new Date(repo.updated_at).getTime(),
          };
        });

      // Save projects
      for (const project of processedProjects) {
        await ctx.runMutation(internal.githubMutations.saveProject, project);
      }

      // Extract and save skills
      const skillsMap = new Map<string, { count: number, lastUsed: number }>();

      for (const repo of repos) {
        if (repo.language) {
          const existing = skillsMap.get(repo.language) || { count: 0, lastUsed: 0 };
          skillsMap.set(repo.language, {
            count: existing.count + 1,
            lastUsed: Math.max(existing.lastUsed, new Date(repo.updated_at).getTime())
          });
        }

        // Also extract from topics
        if (repo.topics) {
          for (const topic of repo.topics) {
            const existing = skillsMap.get(topic) || { count: 0, lastUsed: 0 };
            skillsMap.set(topic, {
              count: existing.count + 1,
              lastUsed: Math.max(existing.lastUsed, new Date(repo.updated_at).getTime())
            });
          }
        }
      }

      // Calculate skill strength based on usage
      const maxCount = Math.max(...Array.from(skillsMap.values()).map(s => s.count));

      for (const [skillName, data] of skillsMap.entries()) {
        const category = categorizeSkill(skillName);
        const strength = Math.round((data.count / maxCount) * 100);

        await ctx.runMutation(internal.githubMutations.saveSkill, {
          userId: args.userId,
          name: skillName,
          category,
          strength,
          usageCount: data.count,
          lastUsed: data.lastUsed,
        });
      }

      return {
        success: true,
        projectsCount: processedProjects.length,
        skillsCount: skillsMap.size,
      };
    } catch (error: any) {
      console.error("Error fetching GitHub data:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
});

// Helper function to categorize projects
function categorizeProject(repo: any): string {
  const name = repo.name.toLowerCase();
  const description = (repo.description || "").toLowerCase();
  const topics = (repo.topics || []).map((t: string) => t.toLowerCase());
  const language = (repo.language || "").toLowerCase();

  const allText = `${name} ${description} ${topics.join(" ")} ${language}`;

  if (allText.match(/security|cyber|hack|ctf|exploit|vulnerability|pentest/)) {
    return "Cybersecurity";
  }
  if (allText.match(/algorithm|leetcode|codeforce|competitive|problem|contest/)) {
    return "Competitive Programming";
  }
  if (allText.match(/react|vue|angular|frontend|ui|website|web-app/)) {
    return "Web Development";
  }
  if (allText.match(/api|backend|server|database|node|express|django|flask/)) {
    return "Backend";
  }
  if (allText.match(/machine-learning|ai|ml|neural|deep-learning|tensorflow|pytorch/)) {
    return "Machine Learning";
  }
  if (allText.match(/mobile|android|ios|react-native|flutter/)) {
    return "Mobile Development";
  }
  if (allText.match(/devops|docker|kubernetes|ci-cd|deployment/)) {
    return "DevOps";
  }
  if (allText.match(/blockchain|crypto|web3|smart-contract/)) {
    return "Blockchain";
  }

  return "Other";
}

// Helper function to categorize skills
function categorizeSkill(skill: string): string {
  const skillLower = skill.toLowerCase();

  const languages = ["javascript", "typescript", "python", "java", "c++", "c", "go", "rust", "kotlin", "swift", "ruby", "php"];
  const frameworks = ["react", "vue", "angular", "express", "django", "flask", "nextjs", "nestjs", "spring", "laravel"];
  const tools = ["docker", "kubernetes", "git", "webpack", "vite", "redis", "mongodb", "postgresql", "mysql"];
  const cloud = ["aws", "azure", "gcp", "vercel", "netlify", "heroku"];

  if (languages.includes(skillLower)) return "Languages";
  if (frameworks.includes(skillLower)) return "Frameworks";
  if (tools.includes(skillLower)) return "Tools";
  if (cloud.includes(skillLower)) return "Cloud";

  return "Other";
}
