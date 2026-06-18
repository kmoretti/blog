import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ISSUE_BODY_PATH = "/tmp/issue_body.txt";
const ISSUE_LABELS_PATH = "/tmp/issue_labels.json";
const FRIENDS_JSON_PATH = "src/data/friends.json";

// ── 读取 issue 数据 ──────────────────────────────────────────────

if (!existsSync(ISSUE_BODY_PATH)) {
  console.error("Missing issue body file");
  process.exit(1);
}

const body = readFileSync(ISSUE_BODY_PATH, "utf-8");
let labels = [];
try {
  labels = JSON.parse(readFileSync(ISSUE_LABELS_PATH, "utf-8"));
} catch {
  console.warn("No labels file found, tags will be empty");
}

// ── 解析 issue form 输出的 Markdown ──────────────────────────────

/**
 * GitHub issue forms 会把每个字段渲染成：
 *   ### 字段名
 *
 *   用户填写的值
 *
 * 该函数按 "### " 拆段，取第一段的内容作为该字段的值。
 */
function parseField(md, label) {
  const sections = md.split(/^### /m);
  for (const section of sections) {
    if (section.startsWith(label)) {
      const value = section.slice(section.indexOf("\n") + 1).trim();
      if (!value || value === "_No response_") return "";
      return value.split("\n")[0].trim();
    }
  }
  return "";
}

const name = parseField(body, "网站名称");
const url = parseField(body, "网站链接");
const avatar = parseField(body, "头像链接");
const snapshot = parseField(body, "站点截图链接");
const desc = parseField(body, "一句话介绍");
const feed = parseField(body, "RSS 订阅地址");
const links = parseField(body, "友链页地址");

if (!name || !url || !avatar) {
  console.error(
    `缺少必填字段（name="${name}", url="${url}", avatar="${avatar}"）`,
  );
  process.exit(1);
}

// ── 构造新友链条目 ──────────────────────────────────────────────

// 过滤掉模板自动带的 friend-link 标签，只保留你手动加的
const EXCLUDED_LABELS = new Set(["friend-link"]);
const tags = labels.filter((l) => !EXCLUDED_LABELS.has(l)).join(",");

const friend = {
  name,
  url,
  avatar,
  snapshot: snapshot || "",
  desc: desc || "",
  feed: feed || "",
  tags,
  links: links || "",
};

// ── 写入 friends.json ────────────────────────────────────────────

const existing = JSON.parse(readFileSync(FRIENDS_JSON_PATH, "utf-8"));
existing.push(friend);

writeFileSync(
  FRIENDS_JSON_PATH,
  JSON.stringify(existing, null, 2) + "\n",
  "utf-8",
);

console.log(`Added friend: ${name}`);
