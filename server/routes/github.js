import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import GitHubStats from '../models/GitHubStats.js';

const router = express.Router();

// Demo user ID for unauthenticated requests
const DEMO_USER_ID = new mongoose.Types.ObjectId('000000000000000000000001');

// Fetch GitHub data and sync with database
router.post('/fetch-data', async (req, res) => {
  try {
    const { username, userId } = req.body;

    // Use provided userId or demo user ID for unauthenticated requests
    const finalUserId = userId || req.user?.id || DEMO_USER_ID;

    if (!username) {
      return res.status(400).json({ error: 'GitHub username required' });
    }

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App',
    };

    // Add auth token if available
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user stats
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, { headers });
    const userData = userResponse.data;

    // Fetch repositories
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers }
    );
    const repos = reposResponse.data;

    // Save GitHub stats
    await GitHubStats.findOneAndUpdate(
      { userId: finalUserId },
      {
        userId: finalUserId,
        username,
        publicRepos: userData.public_repos || 0,
        followers: userData.followers || 0,
        following: userData.following || 0,
        lastUpdated: new Date(),
      },
      { upsert: true }
    );

    // Process and save projects
    const processedProjects = repos
      .filter(repo => !repo.fork && !repo.private)
      .map(repo => ({
        userId: finalUserId,
        name: repo.name,
        description: repo.description || undefined,
        category: categorizeProject(repo),
        languages: repo.language ? [repo.language] : [],
        topics: repo.topics || [],
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        url: repo.html_url,
        homepage: repo.homepage || undefined,
        featured: (repo.stargazers_count || 0) > 5,
        githubRepoId: repo.id,
        lastUpdated: new Date(repo.updated_at),
      }));

    // Save projects
    for (const project of processedProjects) {
      await Project.findOneAndUpdate(
        { userId: finalUserId, githubRepoId: project.githubRepoId },
        project,
        { upsert: true }
      );
    }

    // Extract and save skills
    const skillsMap = new Map();

    for (const repo of repos) {
      if (repo.language) {
        const existing = skillsMap.get(repo.language) || { count: 0, lastUsed: 0 };
        skillsMap.set(repo.language, {
          count: existing.count + 1,
          lastUsed: Math.max(existing.lastUsed, new Date(repo.updated_at).getTime())
        });
      }

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

    // Save skills
    const maxCount = Math.max(...Array.from(skillsMap.values()).map(v => v.count), 1);

    for (const [skillName, data] of skillsMap) {
      const strength = Math.round((data.count / maxCount) * 100);
      const category = categorizeSkill(skillName);

      await Skill.findOneAndUpdate(
        { userId: finalUserId, name: skillName },
        {
          userId: finalUserId,
          name: skillName,
          category,
          strength,
          usageCount: data.count,
          lastUsed: new Date(data.lastUsed),
        },
        { upsert: true }
      );
    }

    res.json({
      message: 'GitHub data synced successfully',
      stats: {
        projectsCount: processedProjects.length,
        skillsCount: skillsMap.size,
      }
    });
  } catch (error) {
    console.error('GitHub fetch error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to categorize projects
function categorizeProject(repo) {
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());
  const language = (repo.language || '').toLowerCase();

  const text = `${name} ${description} ${topics.join(' ')} ${language}`;

  if (text.includes('web') || text.includes('react') || text.includes('vue') || text.includes('angular')) return 'Web Development';
  if (text.includes('backend') || text.includes('api') || text.includes('node') || text.includes('express')) return 'Backend';
  if (text.includes('security') || text.includes('crypto') || text.includes('encrypt')) return 'Cybersecurity';
  if (text.includes('ml') || text.includes('machine learning') || text.includes('ai') || text.includes('tensorflow')) return 'Machine Learning';
  if (text.includes('mobile') || text.includes('flutter') || text.includes('react-native')) return 'Mobile Development';
  if (text.includes('devops') || text.includes('docker') || text.includes('kubernetes')) return 'DevOps';
  if (text.includes('blockchain') || text.includes('crypto') || text.includes('web3')) return 'Blockchain';
  if (text.includes('competitive') || text.includes('algorithm') || text.includes('dsa')) return 'Competitive Programming';

  return 'Other';
}

// Helper function to categorize skills
function categorizeSkill(skill) {
  const s = skill.toLowerCase();

  if (['python', 'javascript', 'typescript', 'java', 'cpp', 'c++', 'c#', 'go', 'rust', 'php', 'ruby', 'swift'].includes(s)) {
    return 'Languages';
  }
  if (['react', 'vue', 'angular', 'svelte', 'express', 'fastapi', 'django', 'flask', 'spring', 'dotnet'].includes(s)) {
    return 'Frameworks';
  }
  if (['docker', 'kubernetes', 'terraform', 'jenkins', 'circleci', 'github', 'gitlab'].includes(s)) {
    return 'DevOps';
  }
  if (['mongodb', 'postgresql', 'mysql', 'redis', 'dynamodb', 'cassandra'].includes(s)) {
    return 'Databases';
  }
  if (['aws', 'gcp', 'azure', 'heroku', 'vercel', 'netlify'].includes(s)) {
    return 'Cloud';
  }

  return 'Tools';
}

export default router;
