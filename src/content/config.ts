import { defineCollection, z } from "astro:content";
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().default("/static/banner.png"),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
  }),
});
// Friends pages (e.g. link exchange instructions)
// Keep schema minimal; only optional metadata for simple Markdown pages.
const friends = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, friends };
