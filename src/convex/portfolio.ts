import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Profile queries and mutations
export const getProfile = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const userId = args.userId || (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return null;

    return await ctx.db
      .query("profile")
      .withIndex("by_user", (q) => q.eq("userId", userId as any))
      .first();
  },
});

export const upsertProfile = mutation({
  args: {
    name: v.string(),
    location: v.optional(v.string()),
    bio: v.optional(v.string()),
    tagline: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    resumeUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject as any;

    const existing = await ctx.db
      .query("profile")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }

    return await ctx.db.insert("profile", {
      userId,
      ...args,
    });
  },
});

// GitHub stats queries
export const getGitHubStats = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const userId = args.userId || (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return null;

    return await ctx.db
      .query("githubStats")
      .withIndex("by_user", (q) => q.eq("userId", userId as any))
      .first();
  },
});

// Projects queries
export const getProjects = query({
  args: {
    userId: v.optional(v.id("users")),
    category: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId || (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return [];

    let projectsQuery = ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", userId as any));

    const projects = await projectsQuery.collect();

    // Apply filters
    let filtered = projects;

    if (args.category && args.category !== "all") {
      filtered = filtered.filter((p) => p.category === args.category);
    }

    if (args.featured !== undefined) {
      filtered = filtered.filter((p) => p.featured === args.featured);
    }

    // Sort by stars descending
    return filtered.sort((a, b) => b.stars - a.stars);
  },
});

export const getProjectCategories = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const userId = args.userId || (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return [];

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", userId as any))
      .collect();

    const categories = new Set(projects.map((p) => p.category));
    return Array.from(categories).sort();
  },
});

// Skills queries
export const getSkills = query({
  args: {
    userId: v.optional(v.id("users")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId || (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return [];

    let skillsQuery = ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", userId as any));

    const skills = await skillsQuery.collect();

    // Apply category filter
    let filtered = skills;
    if (args.category && args.category !== "all") {
      filtered = filtered.filter((s) => s.category === args.category);
    }

    // Sort by strength descending
    return filtered.sort((a, b) => b.strength - a.strength);
  },
});

export const getSkillCategories = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const userId = args.userId || (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return [];

    const skills = await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", userId as any))
      .collect();

    const categories = new Set(skills.map((s) => s.category));
    return Array.from(categories).sort();
  },
});

// Achievements queries and mutations
export const getAchievements = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const userId = args.userId || (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) return [];

    const achievements = await ctx.db
      .query("achievements")
      .withIndex("by_user", (q) => q.eq("userId", userId as any))
      .collect();

    return achievements.sort((a, b) => a.order - b.order);
  },
});

export const upsertAchievement = mutation({
  args: {
    title: v.string(),
    value: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject as any;

    return await ctx.db.insert("achievements", {
      userId,
      ...args,
    });
  },
});
