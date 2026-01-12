import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const saveGitHubStats = internalMutation({
  args: {
    userId: v.id("users"),
    username: v.string(),
    publicRepos: v.number(),
    followers: v.number(),
    following: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if stats already exist
    const existing = await ctx.db
      .query("githubStats")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        username: args.username,
        publicRepos: args.publicRepos,
        followers: args.followers,
        following: args.following,
        lastUpdated: Date.now(),
      });
    } else {
      await ctx.db.insert("githubStats", {
        userId: args.userId,
        username: args.username,
        publicRepos: args.publicRepos,
        followers: args.followers,
        following: args.following,
        lastUpdated: Date.now(),
      });
    }
  },
});

export const saveProject = internalMutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    languages: v.array(v.string()),
    topics: v.array(v.string()),
    stars: v.number(),
    forks: v.number(),
    url: v.string(),
    homepage: v.optional(v.string()),
    featured: v.boolean(),
    githubRepoId: v.optional(v.number()),
    lastUpdated: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if project already exists by githubRepoId
    if (args.githubRepoId) {
      const existing = await ctx.db
        .query("projects")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .filter((q) => q.eq(q.field("githubRepoId"), args.githubRepoId))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, {
          name: args.name,
          description: args.description,
          category: args.category,
          languages: args.languages,
          topics: args.topics,
          stars: args.stars,
          forks: args.forks,
          url: args.url,
          homepage: args.homepage,
          featured: args.featured,
          lastUpdated: args.lastUpdated,
        });
        return;
      }
    }

    await ctx.db.insert("projects", args);
  },
});

export const saveSkill = internalMutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    category: v.string(),
    strength: v.number(),
    usageCount: v.number(),
    lastUsed: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if skill already exists
    const existing = await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        category: args.category,
        strength: args.strength,
        usageCount: args.usageCount,
        lastUsed: args.lastUsed,
      });
    } else {
      await ctx.db.insert("skills", args);
    }
  },
});
