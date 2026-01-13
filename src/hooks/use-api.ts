import { useState, useEffect } from 'react';
import { portfolioAPI } from '@/lib/api-client';

/**
 * Custom hook to fetch data from Express backend API
 * Replaces Convex useQuery
 */
export function useAPI<T>(
  apiCall: () => Promise<any>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiCall();
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          console.error('API Error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

// Convenience hooks for common API calls
export function useProfile(userId?: string) {
  return useAPI(
    () => portfolioAPI.getProfile(userId),
    [userId]
  );
}

export function useProjects(params?: { userId?: string; category?: string; featured?: boolean }) {
  return useAPI(
    () => portfolioAPI.getProjects(params),
    [params?.userId, params?.category, params?.featured]
  );
}

export function useProjectCategories(userId?: string) {
  return useAPI(
    () => portfolioAPI.getProjectCategories(userId),
    [userId]
  );
}

export function useSkills(params?: { userId?: string; category?: string }) {
  return useAPI(
    () => portfolioAPI.getSkills(params),
    [params?.userId, params?.category]
  );
}

export function useSkillCategories(userId?: string) {
  return useAPI(
    () => portfolioAPI.getSkillCategories(userId),
    [userId]
  );
}

export function useAchievements(userId?: string) {
  return useAPI(
    () => portfolioAPI.getAchievements(userId),
    [userId]
  );
}

export function useGitHubStats(userId?: string) {
  return useAPI(
    () => portfolioAPI.getGitHubStats(userId),
    [userId]
  );
}
