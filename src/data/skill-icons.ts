/**
 * Real brand icons for every skill (devicon CDN, pinned look, no API key).
 * `invert` fixes black monochrome marks (Next.js, Express, GitHub) on dark UI.
 * Skills without a brand mark (REST, Mongoose) use a styled initials tile.
 */

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export interface SkillIcon {
  /** Full image URL. Omit for initials-only tiles. */
  src?: string;
  /** Apply `invert` filter for black-on-transparent marks. */
  invert?: boolean;
  /** Fallback monogram if the image fails to load. */
  initials: string;
  /** Accent color for the fallback tile. */
  color: string;
}

const icon = (path: string, initials: string, color: string, invert = false): SkillIcon => ({
  src: `${CDN}/${path}`,
  invert,
  initials,
  color,
});

export const SKILL_ICONS: Record<string, SkillIcon> = {
  html: icon("html5/html5-original.svg", "H5", "#e34f26"),
  css: icon("css3/css3-original.svg", "C3", "#1572b6"),
  js: icon("javascript/javascript-original.svg", "JS", "#f7df1e"),
  ts: icon("typescript/typescript-original.svg", "TS", "#3178c6"),
  java: icon("java/java-original.svg", "Jv", "#ed8b00"),
  py: icon("python/python-original.svg", "Py", "#3776ab"),
  c: icon("c/c-original.svg", "C", "#a8b9cc"),
  cpp: icon("cplusplus/cplusplus-original.svg", "C+", "#00599c"),
  react: icon("react/react-original.svg", "Re", "#61dafb"),
  next: icon("nextjs/nextjs-original.svg", "Nx", "#ffffff", true),
  tailwind: icon("tailwindcss/tailwindcss-original.svg", "Tw", "#06b6d4"),
  bootstrap: icon("bootstrap/bootstrap-original.svg", "Bs", "#7952b3"),
  node: icon("nodejs/nodejs-original.svg", "Nd", "#339933"),
  express: icon("express/express-original.svg", "Ex", "#ffffff", true),
  firebase: icon("firebase/firebase-plain.svg", "Fb", "#ffca28"),
  rest: { initials: "{;}", color: "#f59e0b" },
  mongoose: { initials: "Mg", color: "#ef4444" },
  mysql: icon("mysql/mysql-original.svg", "My", "#4479a1"),
  mongo: icon("mongodb/mongodb-original.svg", "Mg", "#47a248"),
  postgres: icon("postgresql/postgresql-original.svg", "Pg", "#336791"),
  sqlite: icon("sqlite/sqlite-original.svg", "Sq", "#38bdf8"),
  supabase: icon("supabase/supabase-original.svg", "Sb", "#3ecf8e"),
  git: icon("git/git-original.svg", "Gt", "#f05032"),
  github: icon("github/github-original.svg", "Gh", "#ffffff", true),
  vscode: icon("vscode/vscode-original.svg", "Vs", "#007acc"),
  linux: icon("linux/linux-original.svg", "Lx", "#fcc624"),
  docker: icon("docker/docker-original.svg", "Dk", "#2496ed"),
};

export function getSkillIcon(id: string): SkillIcon {
  return (
    SKILL_ICONS[id] ?? {
      initials: id.slice(0, 2).toUpperCase(),
      color: "#e8c87a",
    }
  );
}
