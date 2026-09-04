import { env } from "./env";

export interface PlatformStreak {
  /** Consecutive active days ending today/yesterday. */
  current: number;
  /** Longest run ever. */
  longest: number;
  /** Platform-specific headline stat (solved count / rating). */
  total: number;
  /** Label for `total` (e.g. "Problems Solved", "Rating"). */
  totalLabel: string;
  /** Extra line (e.g. CF rank, LC acceptance context). */
  extra?: string;
  /** Per-difficulty breakdown (LeetCode). */
  breakdown?: { label: string; value: number }[];
  /** False when the platform exposes totals but no submission calendar. */
  streakAvailable?: boolean;
}

const CACHE_TTL = 60 * 60 * 1000; // 1h

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, at } = JSON.parse(raw);
    if (Date.now() - at > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, at: Date.now() }));
  } catch {
    /* storage full / private mode — non-fatal */
  }
}

const pad = (n: number) => String(n).padStart(2, "0");
const dayKey = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const shiftDay = (key: string, delta: number) => {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + delta);
  return dayKey(dt);
};
const isNextDay = (a: string, b: string) => shiftDay(a, 1) === b;

/** Longest run + current run (must touch today or yesterday) from a set of UTC day keys. */
export function computeStreaks(days: Set<string>): { current: number; longest: number } {
  if (days.size === 0) return { current: 0, longest: 0 };
  const sorted = [...days].sort();
  let longest = 0;
  let run = 0;
  let prev = "";
  for (const d of sorted) {
    run = prev && isNextDay(prev, d) ? run + 1 : 1;
    if (run > longest) longest = run;
    prev = d;
  }
  const today = dayKey(new Date());
  let current = 0;
  let cursor = days.has(today) ? today : shiftDay(today, -1);
  if (days.has(cursor)) {
    while (days.has(cursor)) {
      current++;
      cursor = shiftDay(cursor, -1);
    }
  }
  return { current, longest };
}

async function fetchJSON(url: string, timeoutMs = 20000): Promise<any> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// ── Codeforces (official API, CORS-open) ─────────────────────────────
export async function fetchCodeforcesStreak(handle?: string): Promise<PlatformStreak> {
  const h = handle || env.competitive.codeforces.username || "nyt__soul";
  const cacheKey = `streak_cf_${h}`;
  const cached = readCache<PlatformStreak>(cacheKey);
  if (cached) return cached;

  const [info, status] = await Promise.all([
    fetchJSON(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(h)}`),
    fetchJSON(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(h)}`),
  ]);
  if (info.status !== "OK" || status.status !== "OK") throw new Error("Codeforces API error");

  const solved = new Set<string>();
  const days = new Set<string>();
  for (const s of status.result ?? []) {
    if (s.verdict !== "OK" || !s.problem) continue;
    solved.add(`${s.problem.contestId}-${s.problem.index}`);
    days.add(dayKey(new Date(s.creationTimeSeconds * 1000)));
  }
  const { current, longest } = computeStreaks(days);
  const me = info.result?.[0] ?? {};
  const data: PlatformStreak = {
    current,
    longest,
    total: solved.size,
    totalLabel: "Problems Solved",
    extra: me.rating ? `${me.rank ?? "Rated"} · ${me.rating} (max ${me.maxRating ?? me.rating})` : "Unrated",
  };
  writeCache(cacheKey, data);
  return data;
}

// ── LeetCode (community API) ─────────────────────────────────────────
export async function fetchLeetCodeStreak(username?: string): Promise<PlatformStreak> {
  const u = username || env.competitive.leetcode.username || "nyt__soul";
  const cacheKey = `streak_lc_${u}`;
  const cached = readCache<PlatformStreak>(cacheKey);
  if (cached) return cached;

  const base = "https://alfa-leetcode-api.onrender.com";
  const [solved, calendar] = await Promise.all([
    fetchJSON(`${base}/${encodeURIComponent(u)}/solved`, 25000),
    fetchJSON(`${base}/userProfileCalendar?username=${encodeURIComponent(u)}`, 25000),
  ]);

  const days = new Set<string>();
  let activeDays = 0;
  try {
    const cal = typeof calendar?.submissionCalendar === "string"
      ? JSON.parse(calendar.submissionCalendar)
      : calendar?.submissionCalendar ?? {};
    for (const ts of Object.keys(cal)) {
      const count = Number(cal[ts]);
      if (count > 0) {
        days.add(dayKey(new Date(Number(ts) * 1000)));
        activeDays++;
      }
    }
  } catch {
    /* malformed calendar — streak stays 0, still show solved count */
  }
  const { current, longest } = computeStreaks(days);
  const total = Number(solved?.solvedProblem ?? solved?.totalSolved ?? 0);
  const data: PlatformStreak = {
    current,
    longest,
    total,
    totalLabel: "Problems Solved",
    extra: activeDays > 0 ? `${activeDays} active days` : undefined,
    breakdown: [
      { label: "Easy", value: Number(solved?.easySolved ?? 0) },
      { label: "Med", value: Number(solved?.mediumSolved ?? 0) },
      { label: "Hard", value: Number(solved?.hardSolved ?? 0) },
    ],
    // LeetCode's calendar endpoint returns no data for this profile —
    // totals are live, but a day-streak cannot be computed honestly.
    streakAvailable: activeDays > 0,
  };
  writeCache(cacheKey, data);
  return data;
}

// ── GitHub streak widget (live SVG, themed to the site) ─────────────
export function githubStreakImage(username?: string): string {
  const u = username || env.github.username;
  const params = new URLSearchParams({
    user: u,
    theme: "transparent",
    hide_border: "true",
    background: "12121200",
    stroke: "e8c87a",
    ring: "e8c87a",
    fire: "e8c87a",
    currStreakNum: "ffffff",
    sideNums: "ffffff",
    currStreakLabel: "8a8a8a",
    sideLabels: "8a8a8a",
    dates: "555555",
  });
  return `https://streak-stats.demolab.com?${params.toString()}`;
}
