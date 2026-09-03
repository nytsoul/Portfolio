/**
 * Environment Variables Helper (Next.js)
 * Centralized access to all environment variables with type safety.
 * Canonical prefix: NEXT_PUBLIC_ (VITE_ legacy supported via .env mapping).
 */

function str(key: string, fallback = ""): string {
  const v = process.env[key];
  return v === undefined || v === "" ? fallback : v;
}

function strOpt(key: string): string | undefined {
  const v = process.env[key];
  return v === undefined || v === "" ? undefined : v;
}

function num(key: string, fallback: number): number {
  const raw = process.env[key];
  const parsed = raw === undefined || raw === "" ? NaN : parseInt(raw, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function flag(key: string): boolean {
  return process.env[key] === "true";
}

export const env = {
  // VLY Platform
  vlyAppId: strOpt("NEXT_PUBLIC_VLY_APP_ID"),
  vlyMonitoringUrl: strOpt("NEXT_PUBLIC_VLY_MONITORING_URL"),

  // GitHub
  github: {
    username: str("NEXT_PUBLIC_GITHUB_USERNAME", "nytsoul"),
    apiBase: str("NEXT_PUBLIC_GITHUB_API_BASE", "https://api.github.com"),
    cacheDuration: num("NEXT_PUBLIC_GITHUB_CACHE_DURATION", 3600000),
    maxRepos: num("NEXT_PUBLIC_GITHUB_MAX_REPOS", 100),
  },

  // Portfolio
  portfolio: {
    name: str("NEXT_PUBLIC_PORTFOLIO_NAME", "Neshun R"),
    location: str("NEXT_PUBLIC_PORTFOLIO_LOCATION", "Chennai, India"),
    email: str("NEXT_PUBLIC_PORTFOLIO_EMAIL", "neshun7413@gmail.com"),
    website: strOpt("NEXT_PUBLIC_PORTFOLIO_WEBSITE"),
    linkedin: strOpt("NEXT_PUBLIC_PORTFOLIO_LINKEDIN"),
    github: str("NEXT_PUBLIC_PORTFOLIO_GITHUB", "nytsoul"),
    tagline: str(
      "NEXT_PUBLIC_PORTFOLIO_TAGLINE",
      "Full-stack developer passionate about AI, cybersecurity, and building scalable systems",
    ),
    bio: str(
      "NEXT_PUBLIC_PORTFOLIO_BIO",
      "3rd-year CS Engineering student at SSN College of Engineering. Building robust systems and solving real-world problems with a focus on user experience and architectural thinking.",
    ),
  },

  // Academic
  academic: {
    collegeName: str("NEXT_PUBLIC_COLLEGE_NAME", "SSN College of Engineering"),
    collegeLocation: str("NEXT_PUBLIC_COLLEGE_LOCATION", "Chennai"),
    degree: str("NEXT_PUBLIC_DEGREE", "Computer Science Engineering"),
    year: str("NEXT_PUBLIC_YEAR", "3rd Year"),
    gpa: str("NEXT_PUBLIC_GPA", "6.899"),
    experienceYears: str("NEXT_PUBLIC_EXPERIENCE_YEARS", "1+"),
  },

  // Competitive Programming
  competitive: {
    codeforces: {
      username: strOpt("NEXT_PUBLIC_CODEFORCES_USERNAME"),
      problemsSolved: num("NEXT_PUBLIC_CODEFORCES_PROBLEMS_SOLVED", 50),
    },
    leetcode: {
      username: strOpt("NEXT_PUBLIC_LEETCODE_USERNAME"),
    },
    codechef: {
      username: strOpt("NEXT_PUBLIC_CODECHEF_USERNAME"),
    },
  },

  // Stats
  stats: {
    projectsCompleted: num("NEXT_PUBLIC_PROJECTS_COMPLETED", 10),
    totalContributions: num("NEXT_PUBLIC_TOTAL_CONTRIBUTIONS", 500),
  },

  // Feature Flags
  features: {
    githubSync: flag("NEXT_PUBLIC_ENABLE_GITHUB_SYNC"),
    analytics: flag("NEXT_PUBLIC_ENABLE_ANALYTICS"),
    contactForm: flag("NEXT_PUBLIC_ENABLE_CONTACT_FORM"),
    darkMode: flag("NEXT_PUBLIC_ENABLE_DARK_MODE"),
    typewriter: flag("NEXT_PUBLIC_ENABLE_TYPEWRITER"),
    animations: flag("NEXT_PUBLIC_ENABLE_ANIMATIONS"),
  },

  // Analytics
  analytics: {
    googleAnalyticsId: strOpt("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"),
    hotjarId: strOpt("NEXT_PUBLIC_HOTJAR_ID"),
    posthogKey: strOpt("NEXT_PUBLIC_POSTHOG_KEY"),
  },

  // Contact Form Services
  contactForm: {
    formspreeId: strOpt("NEXT_PUBLIC_FORMSPREE_ID"),
    emailjs: {
      serviceId: strOpt("NEXT_PUBLIC_EMAILJS_SERVICE_ID"),
      templateId: strOpt("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID"),
      publicKey: strOpt("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY"),
    },
  },

  // SEO & Meta
  seo: {
    siteUrl: str("NEXT_PUBLIC_SITE_URL", "https://neshun.dev"),
    title: str("NEXT_PUBLIC_SITE_TITLE", "Neshun R - Developer Portfolio"),
    description: str(
      "NEXT_PUBLIC_SITE_DESCRIPTION",
      "3rd-year CS Engineering student at SSN College of Engineering. Building robust systems and solving real-world problems.",
    ),
    keywords: str(
      "NEXT_PUBLIC_SITE_KEYWORDS",
      "portfolio,developer,full-stack,AI,cybersecurity",
    ),
    author: str("NEXT_PUBLIC_SITE_AUTHOR", "Neshun R"),
    image: str("NEXT_PUBLIC_SITE_IMAGE", "/og-image.jpg"),
  },

  // Social Media
  social: {
    twitter: strOpt("NEXT_PUBLIC_TWITTER_HANDLE"),
    facebook: strOpt("NEXT_PUBLIC_FACEBOOK_PAGE"),
    instagram: strOpt("NEXT_PUBLIC_INSTAGRAM_HANDLE"),
    youtube: strOpt("NEXT_PUBLIC_YOUTUBE_CHANNEL"),
    medium: strOpt("NEXT_PUBLIC_MEDIUM_USERNAME"),
    devTo: strOpt("NEXT_PUBLIC_DEV_TO_USERNAME"),
  },

  // Resume
  resume: {
    url: str("NEXT_PUBLIC_RESUME_URL", "/resume.pdf"),
    lastUpdated: strOpt("NEXT_PUBLIC_CV_LAST_UPDATED"),
  },

  // Development
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  appVersion: str("NEXT_PUBLIC_APP_VERSION", "1.0.0"),
  buildDate: strOpt("NEXT_PUBLIC_BUILD_DATE"),
  debugMode: flag("NEXT_PUBLIC_DEBUG_MODE"),

  // Performance
  performance: {
    serviceWorker: flag("NEXT_PUBLIC_ENABLE_SERVICE_WORKER"),
    cacheImages: flag("NEXT_PUBLIC_CACHE_IMAGES"),
    lazyLoadImages: flag("NEXT_PUBLIC_LAZY_LOAD_IMAGES"),
  },

  // Theme
  theme: {
    defaultTheme: (str("NEXT_PUBLIC_DEFAULT_THEME", "dark") || "dark") as "light" | "dark",
    enableToggle: flag("NEXT_PUBLIC_ENABLE_THEME_TOGGLE"),
    primaryColor: str("NEXT_PUBLIC_PRIMARY_COLOR", "#06b6d4"),
    accentColor: str("NEXT_PUBLIC_ACCENT_COLOR", "#8b5cf6"),
  },
} as const;

// Type-safe environment variable checker
export function checkRequiredEnvVars() {
  const required = ["NEXT_PUBLIC_GITHUB_USERNAME"];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`Missing environment variables (using defaults): ${missing.join(", ")}`);
  }

  return missing.length === 0;
}

// Log environment info in development
if (env.isDevelopment && env.debugMode) {
  console.log("Environment Configuration:", {
    mode: process.env.NODE_ENV,
    version: env.appVersion,
    githubUsername: env.github.username,
    features: env.features,
  });
}
