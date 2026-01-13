import axios from 'axios';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Portfolio API calls
export const portfolioAPI = {
  getProfile: (userId?: string) =>
    apiClient.get('/portfolio/profile', { params: { userId } }),
  
  getProjects: (params?: { userId?: string; category?: string; featured?: boolean }) =>
    apiClient.get('/portfolio/projects', { params }),
  
  getProjectCategories: (userId?: string) =>
    apiClient.get('/portfolio/project-categories', { params: { userId } }),
  
  getSkills: (params?: { userId?: string; category?: string }) =>
    apiClient.get('/portfolio/skills', { params }),
  
  getSkillCategories: (userId?: string) =>
    apiClient.get('/portfolio/skill-categories', { params: { userId } }),
  
  getAchievements: (userId?: string) =>
    apiClient.get('/portfolio/achievements', { params: { userId } }),
  
  getGitHubStats: (userId?: string) =>
    apiClient.get('/portfolio/github-stats', { params: { userId } }),
  
  updateProfile: (data: any) =>
    apiClient.post('/portfolio/profile', data),
  
  createAchievement: (data: any) =>
    apiClient.post('/portfolio/achievement', data),
};

// GitHub API calls
export const githubAPI = {
  fetchData: (username: string) =>
    apiClient.post('/github/fetch-data', { username }),
};

export default apiClient;
