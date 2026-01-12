import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Portfolio tables
    profile: defineTable({
      userId: v.id("users"),
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
    }).index("by_user", ["userId"]),

    githubStats: defineTable({
      userId: v.id("users"),
      username: v.string(),
      publicRepos: v.number(),
      followers: v.number(),
      following: v.number(),
      totalStars: v.optional(v.number()),
      totalForks: v.optional(v.number()),
      lastUpdated: v.number(),
    }).index("by_user", ["userId"]),

    projects: defineTable({
      userId: v.id("users"),
      name: v.string(),
      description: v.optional(v.string()),
      category: v.string(), // Web Development, Backend, Cybersecurity, Competitive Programming, etc.
      languages: v.array(v.string()),
      topics: v.array(v.string()),
      stars: v.number(),
      forks: v.number(),
      url: v.string(),
      homepage: v.optional(v.string()),
      featured: v.boolean(),
      githubRepoId: v.optional(v.number()),
      lastUpdated: v.number(),
    }).index("by_user", ["userId"])
      .index("by_user_and_category", ["userId", "category"])
      .index("by_user_and_featured", ["userId", "featured"]),

    skills: defineTable({
      userId: v.id("users"),
      name: v.string(),
      category: v.string(), // Languages, Frameworks, Tools, etc.
      strength: v.number(), // 0-100 based on usage frequency
      usageCount: v.number(),
      lastUsed: v.number(),
    }).index("by_user", ["userId"])
      .index("by_user_and_category", ["userId", "category"]),

    achievements: defineTable({
      userId: v.id("users"),
      title: v.string(),
      value: v.string(),
      description: v.optional(v.string()),
      icon: v.optional(v.string()),
      order: v.number(),
    }).index("by_user", ["userId"])
  },
  {
    schemaValidation: false,
  },
);

export default schema;
