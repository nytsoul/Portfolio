import { useEffect, useState } from 'react';
import { githubAPI } from '@/lib/api-client';
import { env } from '@/lib/env';

/**
 * Hook to automatically sync GitHub data when component mounts
 * Fetches repos, projects, skills from GitHub via REST API
 */
export function useGitHubSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncGitHubData = async () => {
      // Check if GitHub sync is enabled
      if (!env.features.githubSync || !env.github.username) {
        return;
      }

      setIsSyncing(true);
      setError(null);

      try {
        console.log('🔄 Syncing GitHub data for:', env.github.username);
        
        // Call the GitHub sync endpoint
        const response = await githubAPI.fetchData(env.github.username);

        console.log('✅ GitHub data synced successfully:', response.data);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message || 'Failed to sync GitHub data';
        console.error('❌ Failed to sync GitHub data:', errorMessage);
        setError(errorMessage);
        // Don't throw - this is not critical for app functionality
      } finally {
        setIsSyncing(false);
      }
    };

    // Sync on mount
    syncGitHubData();
  }, []); // Empty dependency array - sync once on mount

  return { isSyncing, error };
}
