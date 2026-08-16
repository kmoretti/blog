import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    pattern: "**/index.mdx",
    base: "./src/content/posts",
    generateId: ({ entry }) => entry.replace(/\/index\.mdx$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().default("/static/banner.png"),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    summary: z.string().optional(),
  }),
});

const friends = defineCollection({
  loader: glob({
    pattern: "index.md",
    base: "./src/content/friends",
    generateId: () => "index",
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, friends };
