export interface ProjectMetadata {
    description?: string;
    image?: string;
    featured?: boolean;
    order?: number;
}

// Curated portfolio projects — ONLY these repos are shown on the site.
// Keys are lowercase repository names.
export const CURATED_PROJECTS = [
    'agroverse',
    'finguard',
    'aitaxgpt',
    'cognirad',
    'guard-ai',
    'bankmanagementsystem',
] as const;

// Map repository names (lowercase) to custom metadata
export const projectMetadata: Record<string, ProjectMetadata> = {
    'agroverse': {
        image: '/images/projects/agroverse.svg',
        description: 'A transparent supply chain management system built with Blockchain technology to ensure fair pricing for farmers and trust for consumers.',
        featured: true,
        order: 1,
    },
    'finguard': {
        image: '/images/projects/finguard.svg',
        description: 'Built for SNU Hacks — a financial safety platform helping users spot fraud and manage money with confidence.',
        featured: true,
        order: 2,
    },
    'aitaxgpt': {
        image: '/images/projects/aitaxgpt.svg',
        description: 'Built for the ImpactNexus Hackathon — an AI-powered assistant that simplifies tax filing and answers tax questions.',
        featured: true,
        order: 3,
    },
    'cognirad': {
        image: '/images/projects/cognirad.svg',
        description: 'AI-driven X-ray analysis platform delivering faster radiology insights.',
        featured: true,
        order: 4,
    },
    'guard-ai': {
        image: '/images/projects/guard-ai.svg',
        description: 'AI-powered security monitoring platform with real-time threat detection and analytics.',
        featured: true,
        order: 5,
    },
    'bankmanagementsystem': {
        image: '/images/projects/bank.svg',
        description: 'Full-stack bank management system with accounts, transactions and an admin dashboard. Internet Programming mini project.',
        featured: true,
        order: 6,
    },
};

export function getProjectMetadata(repoName: string): ProjectMetadata | undefined {
    return projectMetadata[repoName.toLowerCase()];
}

export function isCuratedProject(repoName: string): boolean {
    return (CURATED_PROJECTS as readonly string[]).includes(repoName.toLowerCase());
}

/**
 * Live screenshot of a project's deployment (or repo page as fallback).
 * Uses the free WordPress mShots service — no API key needed.
 */
export function deploymentScreenshot(url: string, width = 800): string {
    return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}`;
}
