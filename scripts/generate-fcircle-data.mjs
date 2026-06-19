import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, "..");

// 读取友链数据
const friendsPath = join(root, "src", "data", "friends.json");
const friends = JSON.parse(readFileSync(friendsPath, "utf-8"));

// 转换为 FCircle Lite 所需格式: { friends: [[name, url, links, avatar], ...] }
const fcircleData = {
  friends: friends.map((item) => [
    item.name,
    item.url,
    item.links || "",
    item.avatar,
  ]),
};

// 写入 public/friend.json
const outputPath = join(root, "public", "friend.json");
writeFileSync(outputPath, JSON.stringify(fcircleData, null, 2), "utf-8");

console.log(`✓ 已生成 ${outputPath}，共 ${fcircleData.friends.length} 位朋友`);
