import { getCollection } from "astro:content";

export interface DayData {
  date: Date;
  wordCount: number;
}

export async function getHeatmapData(days: number = 40): Promise<DayData[]> {
  const posts = await getCollection("posts");

  // 计算起始日期（从今天往前推指定天数）
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days + 1);
  startDate.setHours(0, 0, 0, 0);

  // 初始化每天的数据
  const dayMap = new Map<string, number>();
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateKey = date.toISOString().split("T")[0];
    dayMap.set(dateKey, 0);
  }

  // 统计每天的文章字数
  posts.forEach((post) => {
    const postDate = new Date(post.data.date);
    postDate.setHours(0, 0, 0, 0);
    const dateKey = postDate.toISOString().split("T")[0];

    if (dayMap.has(dateKey)) {
      // 计算字数（移除frontmatter后的内容）
      const content = post.body || "";
      const wordCount = content.length;
      dayMap.set(dateKey, (dayMap.get(dateKey) || 0) + wordCount);
    }
  });

  // 转换为数组格式
  const result: DayData[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateKey = date.toISOString().split("T")[0];
    result.push({
      date: new Date(date),
      wordCount: dayMap.get(dateKey) || 0,
    });
  }

  return result;
}

export function getColorIntensity(
  wordCount: number,
  maxWordCount: number,
): string {
  if (wordCount === 0) return "bg-gray-100 dark:bg-gray-800";

  const intensity = wordCount / maxWordCount;

  if (intensity >= 0.75) return "bg-green-600 dark:bg-green-500";
  if (intensity >= 0.5) return "bg-green-500 dark:bg-green-600";
  if (intensity >= 0.25) return "bg-green-400 dark:bg-green-700";
  return "bg-green-300 dark:bg-green-800";
}
