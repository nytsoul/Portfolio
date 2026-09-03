/**
 * Centralized portfolio content — single source of truth.
 * All personal data, journey entries, expertise, and achievements live here.
 * API-sourced data (GitHub repos, skills) is handled separately via hooks.
 */

// ── Navigation ──────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { name: "Home", href: "/", number: "01" },
  { name: "Work", href: "/work", number: "02" },
  { name: "About", href: "/about", number: "03" },
  { name: "Experience", href: "/experience", number: "04" },
  { name: "Skills", href: "/skills", number: "05" },
  { name: "Achievements", href: "/achievements", number: "06" },
  { name: "Contact", href: "/contact", number: "07" },
] as const;

// ── Hero ────────────────────────────────────────────────────────────────
export const HERO = {
  name: "NESHUN R",
  headline: "BUILDING DIGITAL PRODUCTS THAT MATTER.",
  subtitle: "Developer • Product Builder • AI Enthusiast • Entrepreneur",
  cta: {
    primary: { label: "View My Work", href: "/work" },
    secondary: { label: "About Me", href: "/about" },
  },
} as const;

// ── About ───────────────────────────────────────────────────────────────
export const ABOUT = {
  headline: "ABOUT NESHUN",
  statement:
    "I'm a developer who believes that technology should be felt, not just used. I build products that sit at the intersection of engineering excellence and human experience.",
  paragraphs: [
    "I'm Neshun R, a 3rd-year Computer Science Engineering student at SSN College of Engineering, Chennai. I live by \"Consistency beats motivation.\"",
    "My journey started with a deep curiosity about how digital systems are engineered and has evolved into a mission to build robust, scalable products that solve real-world problems. I combine architectural rigour with an obsession for user experience.",
    "I write clean, maintainable code and believe that quality, not just functionality, defines great software. With expertise ranging from full-stack development to AI integration and cybersecurity, I push the boundaries of what modern technology can accomplish.",
  ],
  quickFacts: [
    { label: "Location", value: "Chennai, India" },
    { label: "Degree", value: "B.E. Computer Science" },
    { label: "University", value: "SSN College of Engineering" },
    { label: "Year", value: "3rd Year (2024 – 2028)" },
    { label: "Status", value: "Open to Work" },
  ],
} as const;

// ── Expertise ───────────────────────────────────────────────────────────
export const EXPERTISE = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end web applications with modern frameworks. Responsive frontends, RESTful APIs, and scalable backend architectures built for production.",
    tags: ["React", "Next.js", "Node.js", "Express"],
  },
  {
    title: "AI & Machine Learning",
    description:
      "Integrating AI capabilities into production systems — LLMs, computer vision, and intelligent automation pipelines that enhance real-world workflows.",
    tags: ["Python", "TensorFlow", "LLMs", "OpenAI API"],
  },
  {
    title: "Cybersecurity",
    description:
      "Security-first development, penetration testing, and hardened system design that protects both infrastructure and user data.",
    tags: ["Ethical Hacking", "OWASP", "Linux", "CTF"],
  },
] as const;

// ── Journey / Timeline ──────────────────────────────────────────────────
export interface JourneyEntry {
  year: string;
  title: string;
  description: string;
  type: "education" | "work" | "achievement" | "milestone";
  organization?: string;
  location?: string;
  technologies?: string[];
}

export const JOURNEY: JourneyEntry[] = [
  {
    year: "2024",
    title: "Enrolled at SSN College of Engineering",
    description:
      "Began pursuing B.E. in Computer Science and Engineering at one of Chennai's top institutions.",
    type: "education",
    organization: "SSN College of Engineering",
    location: "Chennai, India",
  },
  {
    year: "2024",
    title: "Started Competitive Programming",
    description:
      "Began solving problems on Codeforces, building strong algorithmic thinking and problem-solving skills.",
    type: "milestone",
    organization: "Codeforces",
    technologies: ["C++", "Algorithms", "Data Structures"],
  },
  {
    year: "2025",
    title: "First Full-Stack Production App",
    description:
      "Shipped my first complete full-stack application, demonstrating end-to-end development capabilities.",
    type: "work",
    technologies: ["React", "Node.js", "MongoDB", "TypeScript"],
  },
  {
    year: "2025",
    title: "SIH Finalist",
    description:
      "Reached the finals of Smart India Hackathon (SIH), competing with teams from across the country.",
    type: "achievement",
  },
  {
    year: "2026",
    title: "Open to Internships & Collaborations",
    description:
      "Actively seeking internship opportunities and collaborative projects in full-stack development and AI.",
    type: "milestone",
  },
];

// ── Achievements ────────────────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  value: string;
  description: string;
  year?: string;
  category: "hackathon" | "academic" | "milestone" | "competitive";
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "sih-finalist",
    title: "Smart India Hackathon Finalist",
    value: "SIH 2025",
    description:
      "Reached the finals of India's largest hackathon, competing with teams from across the country.",
    year: "2025",
    category: "hackathon",
  },
  {
    id: "cp-problems",
    title: "Competitive Programming",
    value: "50+",
    description: "Problems solved across Codeforces, LeetCode, and other competitive programming platforms.",
    category: "competitive",
  },
  {
    id: "projects-built",
    title: "Projects Built",
    value: "6",
    description:
      "Curated production projects — fintech, AI, security, and supply chain — all shipped to real users.",
    category: "milestone",
  },
  {
    id: "experience",
    title: "Years of Building",
    value: "2+",
    description: "Consistent development experience across personal, academic, and collaborative projects.",
    category: "milestone",
  },
];

// ── Skills (local / hardcoded — augmented by GitHub API) ─────────────────
export const LOCAL_SKILLS = [
  { id: "html", name: "HTML5", category: "Languages", strength: 93 },
  { id: "css", name: "CSS3", category: "Languages", strength: 91 },
  { id: "js", name: "JavaScript", category: "Languages", strength: 92 },
  { id: "ts", name: "TypeScript", category: "Languages", strength: 95 },
  { id: "java", name: "Java", category: "Languages", strength: 82 },
  { id: "py", name: "Python", category: "Languages", strength: 85 },
  { id: "c", name: "C", category: "Languages", strength: 80 },
  { id: "cpp", name: "C++", category: "Languages", strength: 78 },
  { id: "react", name: "React", category: "Frontend", strength: 90 },
  { id: "next", name: "Next.js", category: "Frontend", strength: 88 },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", strength: 92 },
  { id: "bootstrap", name: "Bootstrap", category: "Frontend", strength: 85 },
  { id: "node", name: "Node.js", category: "Backend", strength: 86 },
  { id: "express", name: "Express", category: "Backend", strength: 84 },
  { id: "firebase", name: "Firebase", category: "Backend", strength: 85 },
  { id: "rest", name: "REST APIs", category: "Backend", strength: 88 },
  { id: "mongoose", name: "Mongoose", category: "Backend", strength: 83 },
  { id: "mysql", name: "MySQL", category: "Databases", strength: 85 },
  { id: "mongo", name: "MongoDB", category: "Databases", strength: 87 },
  { id: "postgres", name: "PostgreSQL", category: "Databases", strength: 78 },
  { id: "sqlite", name: "SQLite", category: "Databases", strength: 82 },
  { id: "supabase", name: "Supabase", category: "Databases", strength: 80 },
  { id: "git", name: "Git", category: "Dev Tools", strength: 90 },
  { id: "github", name: "GitHub", category: "Dev Tools", strength: 92 },
  { id: "vscode", name: "VS Code", category: "Dev Tools", strength: 88 },
  { id: "linux", name: "Linux", category: "Dev Tools", strength: 75 },
  { id: "docker", name: "Docker", category: "Dev Tools", strength: 75 },
] as const;

export const SKILL_CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "Dev Tools",
] as const;

// ── Social Links ────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/nytsoul",
    username: "nytsoul",
  },
  {
    label: "Email",
    href: "mailto:neshun7413@gmail.com",
    username: "neshun7413@gmail.com",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/nyt__soul",
    username: "@nyt__soul",
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/nytsoul",
    username: "nytsoul",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/nyt__soul",
    username: "nyt__soul",
  },
] as const;

// ── Lab Experiments ─────────────────────────────────────────────────────
export interface LabExperiment {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "live" | "wip" | "concept";
}

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "particle-sphere",
    title: "Interactive Particle Sphere",
    description:
      "A Three.js particle system that responds to mouse movement and scroll, built with instanced meshes for performance.",
    tags: ["Three.js", "WebGL", "React Three Fiber"],
    status: "live",
  },
];
