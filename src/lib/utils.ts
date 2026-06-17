import { type ClassValue, clsx } from "clsx";
import type { CollectionEntry } from "astro:content";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export type PostEntry = CollectionEntry<"posts">;
export type TaxonomyKey = "tags" | "categories";

export interface TaxonomyItem {
  name: string;
  slug: string;
  count: number;
}

export function sortPostsByDate(posts: PostEntry[]) {
  return [...posts].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export function slugifyTaxonomy(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function collectTaxonomy(
  posts: PostEntry[],
  key: TaxonomyKey,
): TaxonomyItem[] {
  const counter = new Map<string, number>();

  for (const post of posts) {
    for (const item of post.data[key]) {
      const name = item.trim();
      if (!name) continue;
      counter.set(name, (counter.get(name) ?? 0) + 1);
    }
  }

  return [...counter.entries()]
    .map(([name, count]) => ({
      name,
      slug: slugifyTaxonomy(name),
      count,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
}

export function getTaxonomyMap(posts: PostEntry[], key: TaxonomyKey) {
  return new Map(collectTaxonomy(posts, key).map((item) => [item.slug, item]));
}
