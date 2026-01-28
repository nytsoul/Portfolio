import { env } from './env';
import { getProjectMetadata } from '@/data/project-config';

// Types
export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    topics: string[];
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    fork: boolean;
    private: boolean;
}

export interface ProcessedProject {
    _id: string;
    userId: string;
    name: string;
    description?: string;
    category: string;
    image?: string; // Added image field
    languages: string[];
    topics: string[];
    stars: number;
    forks: number;
    url: string;
    homepage?: string;
    featured: boolean;
    githubRepoId: number;
    lastUpdated: Date;
    order?: number; // Added order field
}

export interface GitHubStats {
    userId: string;
    username: string;
    publicRepos: number;
    followers: number;
    following: number;
    lastUpdated: Date;
}

export interface ProcessedSkill {
    _id: string;
    userId: string;
    name: string;
    category: string;
    strength: number;
    usageCount: number;
    lastUsed: Date;
    icon?: string;
}

// Cache management
const CACHE_KEY_PREFIX = 'github_cache_';
const CACHE_DURATION = env.github.cacheDuration;

function getCacheKey(key: string): string {
    return `${CACHE_KEY_PREFIX}${key}`;
}

function getFromCache<T>(key: string): T | null {
    try {
        const cached = localStorage.getItem(getCacheKey(key));
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;

        if (age > CACHE_DURATION) {
            localStorage.removeItem(getCacheKey(key));
            return null;
        }

        return data;
    } catch {
        return null;
    }
}

function setCache<T>(key: string, data: T): void {
    try {
        localStorage.setItem(
            getCacheKey(key),
            JSON.stringify({ data, timestamp: Date.now() })
        );
    } catch (error) {
        console.warn('Failed to cache data:', error);
    }
}

// GitHub API calls
async function fetchGitHubAPI<T>(endpoint: string): Promise<T> {
    const url = `${env.github.apiBase}${endpoint}`;
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
    };

    // Note: GitHub token should NOT be exposed in frontend for security
    // Rate limit for unauthenticated requests: 60 requests/hour
    // For production, consider using GitHub Apps or OAuth

    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Categorization helpers
function categorizeProject(repo: GitHubRepo): string {
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    const topics = (repo.topics || []).map(t => t.toLowerCase());
    const language = (repo.language || '').toLowerCase();

    const text = `${name} ${description} ${topics.join(' ')} ${language}`;

    if (text.includes('web') || text.includes('react') || text.includes('vue') || text.includes('angular'))
        return 'Web Development';
    if (text.includes('backend') || text.includes('api') || text.includes('node') || text.includes('express'))
        return 'Backend';
    if (text.includes('security') || text.includes('crypto') || text.includes('encrypt'))
        return 'Cybersecurity';
    if (text.includes('ml') || text.includes('machine learning') || text.includes('ai') || text.includes('tensorflow'))
        return 'Machine Learning';
    if (text.includes('mobile') || text.includes('flutter') || text.includes('react-native'))
        return 'Mobile Development';
    if (text.includes('devops') || text.includes('docker') || text.includes('kubernetes'))
        return 'DevOps';
    if (text.includes('blockchain') || text.includes('crypto') || text.includes('web3'))
        return 'Blockchain';
    if (text.includes('competitive') || text.includes('algorithm') || text.includes('dsa'))
        return 'Competitive Programming';

    return 'Other';
}

function categorizeSkill(skill: string): string {
    const s = skill.toLowerCase();

    const languages = ['python', 'javascript', 'typescript', 'java', 'cpp', 'c++', 'c#', 'go', 'rust', 'php', 'ruby', 'swift', 'dart', 'c'];
    const frameworks = ['react', 'vue', 'angular', 'svelte', 'express', 'fastapi', 'django', 'flask', 'spring', 'dotnet', 'nextjs', 'next.js'];
    const devops = ['docker', 'kubernetes', 'terraform', 'jenkins', 'circleci', 'github', 'gitlab'];
    const databases = ['mongodb', 'postgresql', 'mysql', 'redis', 'dynamodb', 'cassandra'];
    const cloud = ['aws', 'gcp', 'azure', 'heroku', 'vercel', 'netlify'];

    if (languages.includes(s)) return 'Languages';
    if (frameworks.includes(s)) return 'Frameworks';
    if (devops.includes(s)) return 'DevOps';
    if (databases.includes(s)) return 'Databases';
    if (cloud.includes(s)) return 'Cloud';

    return 'Tools';
}

function getSkillIcon(skill: string): string {
    const s = skill.toLowerCase();
    const iconMap: Record<string, string> = {
        'typescript': '🔷',
        'javascript': '⚡',
        'python': '🐍',
        'java': '☕',
        'c': 'C',
        'dart': '🎯',
        'html5': '📄',
        'html': '📄',
        'css3': '🎨',
        'css': '🎨',
        'react': '⚛️',
        'next.js': 'N',
        'nextjs': 'N',
        'tailwind': '🌊',
        'node.js': '🟢',
        'nodejs': '🟢',
        'express': '⚙️',
        'express.js': '⚙️',
        'mongodb': '🍃',
        'postgresql': '🐘',
        'git': '📦',
        'github': '🐙',
        'docker': '🐳',
        'flutter': '🦋',
        'react-native': '📱',
        'firebase': '🔥',
    };

    return iconMap[s] || '🔧';
}

// Main service functions
export async function fetchGitHubData(username: string = env.github.username): Promise<{
    projects: ProcessedProject[];
    skills: ProcessedSkill[];
    stats: GitHubStats;
}> {
    // Check cache first
    const cacheKey = `data_${username}`;
    const cached = getFromCache<{
        projects: ProcessedProject[];
        skills: ProcessedSkill[];
        stats: GitHubStats;
    }>(cacheKey);

    if (cached) {
        console.log('✅ Using cached GitHub data');
        return cached;
    }

    console.log('🔄 Fetching fresh GitHub data for:', username);

    try {
        // Fetch user data
        const userData = await fetchGitHubAPI<any>(`/users/${username}`);

        // Fetch repositories
        const repos = await fetchGitHubAPI<GitHubRepo[]>(
            `/users/${username}/repos?per_page=${env.github.maxRepos}&sort=updated`
        );

        // Process projects
        const projects: ProcessedProject[] = repos
            .filter(repo => !repo.fork && !repo.private)
            .map(repo => {
                const metadata = getProjectMetadata(repo.name);
                return {
                    _id: `github_${repo.id}`,
                    userId: 'github',
                    name: repo.name,
                    description: metadata?.description || repo.description || undefined,
                    category: categorizeProject(repo),
                    image: metadata?.image,
                    languages: repo.language ? [repo.language] : [],
                    topics: repo.topics || [],
                    stars: repo.stargazers_count || 0,
                    forks: repo.forks_count || 0,
                    url: repo.html_url,
                    homepage: repo.homepage || undefined,
                    featured: metadata?.featured ?? ((repo.stargazers_count || 0) > 5),
                    order: metadata?.order,
                    githubRepoId: repo.id,
                    lastUpdated: new Date(repo.updated_at),
                };
            })
            .sort((a, b) => {
                // Sort by manual order first, then by stars
                if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
                if (a.order !== undefined) return -1;
                if (b.order !== undefined) return 1;
                return b.stars - a.stars;
            });

        // Extract skills
        const skillsMap = new Map<string, { count: number; lastUsed: number }>();

        for (const repo of repos) {
            if (repo.language) {
                const existing = skillsMap.get(repo.language) || { count: 0, lastUsed: 0 };
                skillsMap.set(repo.language, {
                    count: existing.count + 1,
                    lastUsed: Math.max(existing.lastUsed, new Date(repo.updated_at).getTime()),
                });
            }

            if (repo.topics) {
                for (const topic of repo.topics) {
                    const existing = skillsMap.get(topic) || { count: 0, lastUsed: 0 };
                    skillsMap.set(topic, {
                        count: existing.count + 1,
                        lastUsed: Math.max(existing.lastUsed, new Date(repo.updated_at).getTime()),
                    });
                }
            }
        }

        // Process skills
        const maxCount = Math.max(...Array.from(skillsMap.values()).map(v => v.count), 1);
        const skills: ProcessedSkill[] = Array.from(skillsMap.entries()).map(([name, data]) => ({
            _id: `skill_${name}`,
            userId: 'github',
            name,
            category: categorizeSkill(name),
            strength: Math.round((data.count / maxCount) * 100),
            usageCount: data.count,
            lastUsed: new Date(data.lastUsed),
            icon: getSkillIcon(name),
        }));

        // GitHub stats
        const stats: GitHubStats = {
            userId: 'github',
            username,
            publicRepos: userData.public_repos || 0,
            followers: userData.followers || 0,
            following: userData.following || 0,
            lastUpdated: new Date(),
        };

        const result = { projects, skills, stats };

        // Cache the result
        setCache(cacheKey, result);

        console.log('✅ GitHub data fetched successfully:', {
            projects: projects.length,
            skills: skills.length,
        });

        return result;
    } catch (error) {
        console.error('❌ Failed to fetch GitHub data:', error);
        throw error;
    }
}

// Clear cache utility
export function clearGitHubCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith(CACHE_KEY_PREFIX)) {
            localStorage.removeItem(key);
        }
    });
    console.log('🗑️ GitHub cache cleared');
}
