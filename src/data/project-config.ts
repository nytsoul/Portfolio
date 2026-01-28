export interface ProjectMetadata {
    description?: string;
    image?: string;
    featured?: boolean;
    order?: number;
}

// Map repository names (lowercase) to custom metadata
export const projectMetadata: Record<string, ProjectMetadata> = {
    // Web Development Projects
    'agroverse': {
        description: 'A transparent supply chain management system built with Blockchain technology to ensure fair pricing for farmers and trust for consumers.',
        image: '/images/project-web.png',
        featured: true,
        order: 1,
    },
    'portfolio': {
        description: 'My personal developer portfolio featuring a modern, dark-themed UI with live GitHub integration, animations, and responsive design.',
        image: '/images/project-web.png',
        featured: true,
        order: 2,
    },
    'soullink': {
        description: 'A dual-mode communication platform enabling seamless switching between professional and casual messaging contexts.',
        image: '/images/project-web.png',
        featured: true,
        order: 3,
    },

    // Algorithm Projects
    'algorithms-web': {
        description: 'Interactive web platform for visualizing and learning complex algorithms through dynamic animations and step-by-step execution.',
        image: '/images/project-algo.png',
        featured: true,
        order: 4,
    },
    'algorithms-plateform': {
        description: 'Comprehensive competitive programming platform with problem sets, automated judging, and performance analytics.',
        image: '/images/project-algo.png',
        featured: false,
        order: 5,
    },

    // Mobile Projects
    'smartlearnapp': {
        description: 'Intelligent learning companion app for K-12 students featuring personalized study plans and progress tracking.',
        image: '/images/project-mobile.png',
        featured: true,
        order: 6,
    },
    'personal': {
        description: 'Feature-rich productivity and notes application built with Flutter, focusing on privacy and offline-first capabilities.',
        image: '/images/project-mobile.png',
        featured: false,
        order: 7,
    },

    // Game Development
    'rpg': {
        description: 'Classic RPG game engine demonstrating core game development concepts, entity component systems, and sprite animation.',
        image: '/images/project-game.png',
        featured: false,
        order: 8,
    },
};

export function getProjectMetadata(repoName: string): ProjectMetadata | undefined {
    return projectMetadata[repoName.toLowerCase()];
}
