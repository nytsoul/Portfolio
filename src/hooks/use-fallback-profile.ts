import { useMemo } from 'react';
import { env } from '@/lib/env';

/**
 * Hook to provide fallback profile data from environment variables
 * Used when user is not authenticated or data hasn't loaded yet
 */
export function useFallbackProfile(dbProfile: any) {
  return useMemo(() => {
    // If we have database profile, use it
    if (dbProfile) {
      return dbProfile;
    }

    // Otherwise, use environment variables as fallback
    return {
      name: env.portfolio.name,
      location: env.portfolio.location,
      email: env.portfolio.email,
      phone: env.portfolio.phone,
      phoneDisplay: env.portfolio.phoneDisplay,
      instagram: env.portfolio.instagram,
      website: env.portfolio.website,
      github: env.portfolio.github,
      linkedin: env.portfolio.linkedin,
      bio: env.portfolio.bio,
      tagline: env.portfolio.tagline,
      profileImage: '/profile.jpg',
    };
  }, [dbProfile]);
}

/**
 * Hook to provide fallback GitHub stats
 */
export function useFallbackGitHubStats(dbStats: any) {
  return useMemo(() => {
    if (dbStats) {
      return dbStats;
    }

    // Honest zeros — replaced by live GitHub data once it loads
    return {
      username: env.github.username,
      publicRepos: 0,
      followers: 0,
      following: 0,
      totalStars: 0,
      totalForks: 0,
    };
  }, [dbStats]);
}
