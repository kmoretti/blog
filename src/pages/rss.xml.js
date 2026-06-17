import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("posts");

  const items = await Promise.all(
    posts.map(async (post) => {
      const content = parser.render(post.body);
      const categories = [...post.data.categories, ...post.data.tags];

      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/posts/${post.slug}/`,
        categories,
        customData: [
          ...post.data.categories.map(
            (category) => `<feny:category>${category}</feny:category>`,
          ),
          ...post.data.tags.map((tag) => `<feny:tag>${tag}</feny:tag>`),
        ].join(""),
        content: sanitizeHtml(content, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        }),
      };
    }),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    xmlns: {
      feny: "https://blog.081531.xyz/ns/rss",
    },
    items,
  });
}
