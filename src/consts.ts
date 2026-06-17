// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_URL = "https://blog.081531.xyz";
export const SITE_TITLE = "喵洛阁";
export const SITE_DESCRIPTION =
  "克喵的博客我在这里记录我的日常生活、踩坑记录和资源分享。";

export const EMAIL = "mcy@kemiaosw.top";

type GiscusMapping =
  | "pathname"
  | "url"
  | "title"
  | "og:title"
  | "specific"
  | "number";

interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: GiscusMapping;
  strict: "0" | "1";
  reactionsEnabled: "0" | "1";
  emitMetadata: "0" | "1";
  inputPosition: "top" | "bottom";
  lang: string;
}

export const GISCUS_CONFIG: GiscusConfig = {
  repo: "kmoretti/blog",
  repoId: "R_kgDOS9I8wA",
  category: "评论",
  categoryId: "DIC_kwDOS9I8wM4C_VFM",
  mapping: "pathname",
  strict: "1",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  lang: "zh-CN",
};
