import { fetchGitHubData, ProcessedProject, ProcessedSkill, GitHubStats } from './github-service';
import { env } from './env';

// Cache for GitHub data
let cachedData: {
  projects: ProcessedProject[];
  skills: ProcessedSkill[];
  stats: GitHubStats;
} | null = null;

let fetchPromise: Promise<void> | null = null;

// Initialize data fetch
async function ensureGitHubData() {
  if (cachedData) return;

  if (fetchPromise) {
    await fetchPromise;
    return;
  }

  fetchPromise = (async () => {
    try {
      const data = await fetchGitHubData(env.github.username);
      cachedData = data;
    } catch (error) {
      console.error('Failed to fetch GitHub data:', error);
      // Fallback to empty data
      cachedData = {
        projects: [],
        skills: [],
        stats: {
          userId: 'github',
          username: env.github.username,
          publicRepos: 0,
          followers: 0,
          following: 0,
          lastUpdated: new Date(),
        },
      };
    } finally {
      fetchPromise = null;
    }
  })();

  await fetchPromise;
}

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Portfolio API calls using live GitHub data
export const portfolioAPI = {
  getProfile: async (userId?: string) => {
    await delay(100);
    // Return null to trigger fallback to env vars
    return { data: null };
  },

  getProjects: async (params?: { userId?: string; category?: string; featured?: boolean }) => {
    await ensureGitHubData();
    await delay(100);

    let filtered = [...(cachedData?.projects || [])];

    if (params?.category && params.category !== 'all') {
      filtered = filtered.filter(p => p.category === params.category);
    }

    if (params?.featured !== undefined) {
      filtered = filtered.filter(p => p.featured === params.featured);
    }

    // Sort logic handled in github-service (Order > Stars)

    return { data: filtered };
  },

  getProjectCategories: async (userId?: string) => {
    await ensureGitHubData();
    await delay(100);

    const categories = new Set((cachedData?.projects || []).map(p => p.category));
    return { data: Array.from(categories).sort() };
  },

  getSkills: async (params?: { userId?: string; category?: string }) => {
    await ensureGitHubData();
    await delay(100);

    let filtered = [...(cachedData?.skills || [])];

    if (params?.category && params.category !== 'all') {
      filtered = filtered.filter(s => s.category === params.category);
    }

    // Sort by strength descending
    filtered.sort((a, b) => b.strength - a.strength);

    return { data: filtered };
  },

  getSkillCategories: async (userId?: string) => {
    await ensureGitHubData();
    await delay(100);

    const categories = new Set((cachedData?.skills || []).map(s => s.category));
    return { data: Array.from(categories).sort() };
  },

  getAchievements: async (userId?: string) => {
    await delay(100);

    // Calculate achievements from GitHub data
    const totalStars = (cachedData?.projects || []).reduce((sum, p) => sum + p.stars, 0);
    const totalForks = (cachedData?.projects || []).reduce((sum, p) => sum + p.forks, 0);

    return {
      data: [
        {
          _id: 'ach1',
          userId: 'github',
          title: 'Projects Completed',
          value: `${cachedData?.projects.length || 0}+`,
          description: 'Successfully completed various projects',
          icon: '🚀',
          order: 1,
        },
        {
          _id: 'ach2',
          userId: 'github',
          title: 'GitHub Stars',
          value: `${totalStars}+`,
          description: 'Total stars across all repositories',
          icon: '⭐',
          order: 2,
        },
        {
          _id: 'ach3',
          userId: 'github',
          title: 'Total Forks',
          value: `${totalForks}+`,
          description: 'Community contributions and collaborations',
          icon: '🍴',
          order: 3,
        },
        {
          _id: 'ach4',
          userId: 'github',
          title: 'Followers',
          value: `${cachedData?.stats.followers || 0}+`,
          description: 'GitHub followers and community reach',
          icon: '👥',
          order: 4,
        },
      ]
    };
  },

  getGitHubStats: async (userId?: string) => {
    await ensureGitHubData();
    await delay(100);

    return { data: cachedData?.stats || null };
  },

  // Write operations (no-op for frontend-only)
  updateProfile: async (data: any) => {
    console.log('Mock updateProfile:', data);
    return { data };
  },

  createAchievement: async (data: any) => {
    console.log('Mock createAchievement:', data);
    return { data };
  },
};

// GitHub API calls
export const githubAPI = {
  fetchData: async (username: string) => {
    try {
      // Force refresh by clearing cache
      cachedData = null;
      const data = await fetchGitHubData(username);
      cachedData = data;

      return {
        data: {
          message: 'GitHub data synced successfully',
          stats: {
            projectsCount: data.projects.length,
            skillsCount: data.skills.length
          }
        }
      };
    } catch (error) {
      console.error('GitHub sync error:', error);
      throw error;
    }
  },
};

export default portfolioAPI;
