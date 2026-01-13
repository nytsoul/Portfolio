/**
 * Environment Variables Helper
 * Centralized access to all environment variables with type safety
 */

export const env = {
  // VLY Platform
  vlyAppId: import.meta.env.VITE_VLY_APP_ID,
  vlyMonitoringUrl: import.meta.env.VITE_VLY_MONITORING_URL,

  // GitHub
  github: {
    username: import.meta.env.VITE_GITHUB_USERNAME || 'nytsoul',
    apiBase: import.meta.env.VITE_GITHUB_API_BASE || 'https://api.github.com',
    cacheDuration: parseInt(import.meta.env.VITE_GITHUB_CACHE_DURATION || '3600000'),
    maxRepos: parseInt(import.meta.env.VITE_GITHUB_MAX_REPOS || '100'),
  },

  // Portfolio
  portfolio: {
    name: import.meta.env.VITE_PORTFOLIO_NAME || 'Neshun R',
    location: import.meta.env.VITE_PORTFOLIO_LOCATION || 'Chennai, India',
    email: import.meta.env.VITE_PORTFOLIO_EMAIL || 'neshun7413@gmail.com',
    website: import.meta.env.VITE_PORTFOLIO_WEBSITE,
    linkedin: import.meta.env.VITE_PORTFOLIO_LINKEDIN,
    github: import.meta.env.VITE_PORTFOLIO_GITHUB || 'nytsoul',
    tagline: import.meta.env.VITE_PORTFOLIO_TAGLINE || 'Full-stack developer passionate about AI, cybersecurity, and building scalable systems',
    bio: import.meta.env.VITE_PORTFOLIO_BIO || '2nd-year CS Engineering student at SSN College of Engineering. Building robust systems and solving real-world problems with a focus on user experience and architectural thinking.',
  },

  // Academic
  academic: {
    collegeName: import.meta.env.VITE_COLLEGE_NAME || 'SSN College of Engineering',
    collegeLocation: import.meta.env.VITE_COLLEGE_LOCATION || 'Chennai',
    degree: import.meta.env.VITE_DEGREE || 'Computer Science Engineering',
    year: import.meta.env.VITE_YEAR || '2nd Year',
    gpa: import.meta.env.VITE_GPA || '6.875',
    experienceYears: import.meta.env.VITE_EXPERIENCE_YEARS || '1+',
  },

  // Competitive Programming
  competitive: {
    codeforces: {
      username: import.meta.env.VITE_CODEFORCES_USERNAME,
      problemsSolved: parseInt(import.meta.env.VITE_CODEFORCES_PROBLEMS_SOLVED || '300'),
    },
    leetcode: {
      username: import.meta.env.VITE_LEETCODE_USERNAME,
    },
    codechef: {
      username: import.meta.env.VITE_CODECHEF_USERNAME,
    },
  },

  // Stats
  stats: {
    projectsCompleted: parseInt(import.meta.env.VITE_PROJECTS_COMPLETED || '10'),
    totalContributions: parseInt(import.meta.env.VITE_TOTAL_CONTRIBUTIONS || '500'),
  },

  // Feature Flags
  features: {
    githubSync: import.meta.env.VITE_ENABLE_GITHUB_SYNC === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    contactForm: import.meta.env.VITE_ENABLE_CONTACT_FORM === 'true',
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    typewriter: import.meta.env.VITE_ENABLE_TYPEWRITER === 'true',
    animations: import.meta.env.VITE_ENABLE_ANIMATIONS === 'true',
  },

  // Analytics
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    hotjarId: import.meta.env.VITE_HOTJAR_ID,
    posthogKey: import.meta.env.VITE_POSTHOG_KEY,
  },

  // Contact Form Services
  contactForm: {
    formspreeId: import.meta.env.VITE_FORMSPREE_ID,
    emailjs: {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    },
  },

  // SEO & Meta
  seo: {
    siteUrl: import.meta.env.VITE_SITE_URL || 'https://neshun.dev',
    title: import.meta.env.VITE_SITE_TITLE || 'Neshun R - Developer Portfolio',
    description: import.meta.env.VITE_SITE_DESCRIPTION || '2nd-year CS Engineering student at SSN College of Engineering. Building robust systems and solving real-world problems.',
    keywords: import.meta.env.VITE_SITE_KEYWORDS || 'portfolio,developer,full-stack,AI,cybersecurity',
    author: import.meta.env.VITE_SITE_AUTHOR || 'Neshun R',
    image: import.meta.env.VITE_SITE_IMAGE || '/og-image.jpg',
  },

  // Social Media
  social: {
    twitter: import.meta.env.VITE_TWITTER_HANDLE,
    facebook: import.meta.env.VITE_FACEBOOK_PAGE,
    instagram: import.meta.env.VITE_INSTAGRAM_HANDLE,
    youtube: import.meta.env.VITE_YOUTUBE_CHANNEL,
    medium: import.meta.env.VITE_MEDIUM_USERNAME,
    devTo: import.meta.env.VITE_DEV_TO_USERNAME,
  },

  // Resume
  resume: {
    url: import.meta.env.VITE_RESUME_URL || '/resume.pdf',
    lastUpdated: import.meta.env.VITE_CV_LAST_UPDATED,
  },

  // Development
  isDevelopment: import.meta.env.NODE_ENV === 'development',
  isProduction: import.meta.env.NODE_ENV === 'production',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  buildDate: import.meta.env.VITE_BUILD_DATE,
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',

  // Performance
  performance: {
    serviceWorker: import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true',
    cacheImages: import.meta.env.VITE_CACHE_IMAGES === 'true',
    lazyLoadImages: import.meta.env.VITE_LAZY_LOAD_IMAGES === 'true',
  },

  // Theme
  theme: {
    defaultTheme: (import.meta.env.VITE_DEFAULT_THEME || 'dark') as 'light' | 'dark',
    enableToggle: import.meta.env.VITE_ENABLE_THEME_TOGGLE === 'true',
    primaryColor: import.meta.env.VITE_PRIMARY_COLOR || '#06b6d4',
    accentColor: import.meta.env.VITE_ACCENT_COLOR || '#8b5cf6',
  },
} as const;

// Type-safe environment variable checker
export function checkRequiredEnvVars() {
  const required = [
    'VITE_CONVEX_URL',
    'VITE_GITHUB_USERNAME',
  ];

  const missing = required.filter(key => !import.meta.env[key]);

  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return missing.length === 0;
}

// Log environment info in development
if (env.isDevelopment && env.debugMode) {
  console.log('Environment Configuration:', {
    mode: import.meta.env.MODE,
    version: env.appVersion,
    convexUrl: env.convexUrl,
    githubUsername: env.github.username,
    features: env.features,
  });
}
