# 喵洛阁 — blog.081531.xyz

> 克喵的个人博客，于 2023 年建站。记录日常生活、踩坑记录和资源分享。

基于 Astro 5 构建，采用 **Flatpaper** 纸艺风格设计的静态博客。支持明暗模式切换、响应式布局、友链朋友圈、外链安全中转、全文搜索、Giscus 评论等特性。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | [Astro](https://astro.build) 5 — 静态站点生成 (SSG) |
| 样式 | Tailwind CSS 3 + **`--fp-*` CSS Variables** 纸艺设计系统 |
| 字体 | Noto Sans SC（中文）+ Noto Sans Mono（等宽） |
| 图标 | astro-icon + Material Symbols + Iconify 图标集 |
| 内容 | MDX + Astro Content Collections |
| 评论 | Giscus（基于 GitHub Discussions） |
| 搜索 | Pagefind（静态全文搜索） |
| 分析 | Umami |
| 构建 | `astro check && astro build && pagefind` |
| 部署 | Cloudflare Pages |
| 友链数据 | 远程 YAML + Friend-Circle-Lite API |
| 包管理 | pnpm |

## 特性

### 设计系统：Flatpaper 纸艺风格

全站统一的 **纸艺美学** 设计系统，通过 19 个 `--fp-*` CSS 变量驱动：

- **纸张纹理**：全局 `--fp-bg` 米色/深色底 + 淡亚麻纹理叠加
- **卡片质感**：`--fp-paper`/`--fp-warm` 渐变背景，柔和投影 `--fp-shadow`
- **装饰元素**：胶带 (tape)、侧标签 (tab)、不规则圆角 (`border-radius: 255px 18px / 18px 255px`)
- **手绘细节**：h2 标题 SVG 手绘下划线、波浪形链接下划线、highlighter 高亮标记
- **明暗双主题**：全量 CSS 变量自动适配 light/dark

所有组件（Header、卡片、表单、Giscus、404 页面、外链中转页）均继承此设计系统。

### 友链系统

- **远程数据源**：从 `https://friends-api.081531.xyz/link.yml`（Butterfly 主题 YAML 格式）自动拉取友链数据
- **友链详情页**：卡片式布局（胶带 + tab + 旋转），展示站点截图、延迟检测（整合 Friend-Circle-Lite 数据）、RSS 订阅、标签
- **友链朋友圈**：RSS 文章流聚合页面，flatpaper 风格卡片
- **友链申请/更新表单**：通过 `https://verify.081531.xyz` API 提交，双 tab 切换（Apply / Update）
- **简洁视图**：纯文字列表入口

### 外链安全中转

自动将文章中的外部链接替换为 `/go/?u=BASE64_URL&ref=BASE64_REF` 安全中转页面，具备：

- 目标站点信息展示（图标 + 标题）
- 倒计时自动跳转 + 手动取消
- 显示来源页面（通过 `ref` 参数），可一键返回
- 可配置白名单域名、排除选择器

### 自定义组件

内置 15 个 MDX 文章组件（`src/components/posts/`）：

`Alert`, `Badge`, `BlogHeader`, `Blur`, `Chat`, `Key`, `LinkBanner`, `LinkCard`, `Pic`, `Poetry`, `ProseA`, `Quote`, `Tab`, `Timeline`, `Tip`

全部适配 flatpaper 纸艺风格。

### 更多功能

- **AI 总结**：文章 AI 摘要（配置在 `public/js/aisummary.config.js`）
- **文章图片灯箱**：`public/js/lightbox.js`
- **目录生成**：`public/js/GmeekTOC.js`
- **GitHub 贡献热力图**：`Heatmap.astro`
- **分类/标签云**：`TaxonomyCloud.astro`
- **前后文章导航**：`PostNavigator.astro`
- **文章元信息**：`PostMetaChips.astro`
- **Giscus 评论**：暗色模式自动跟随主题切换
- **Pagefind 全文搜索**：`PostSearch.astro`

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器（默认 http://localhost:4321）
pnpm dev

# 构建生产版本
pnpm build

# 本地预览构建产物
pnpm preview
```

> `pnpm build` 会依次执行 `astro check`（类型检查）、`astro build`（静态构建）和 `pagefind --site dist`（搜索索引生成）。

### 目录结构

```
src/
├── components/
│   ├── about/           # 关于页面组件
│   │   ├── AboutPageShowcase.astro
│   │   └── AboutPanelHead.astro
│   ├── posts/           # 15 个 MDX 自定义组件
│   ├── FriendLinkForm.astro
│   ├── Giscus.astro     # 评论组件
│   ├── Header.astro     # 导航栏（纸艺风格）
│   ├── Heatmap.astro    # GitHub 热力图
│   ├── ThemeToggle.astro
│   └── ...
├── content/
│   ├── config.ts        # Content Collections schema
│   └── posts/           # 博客文章（.mdx）
├── layouts/
│   └── Layout.astro     # 全局布局（主题、外链替换、SEO）
├── lib/
│   ├── friends.ts       # 友链数据获取与解析
│   ├── heatmap.ts
│   └── utils.ts
├── pages/
│   ├── about.astro
│   ├── index.astro
│   ├── 404.astro
│   ├── go.astro         # 外链安全中转页
│   └── friends/         # 友链相关页面（4 个）
├── styles/
│   └── global.css       # 全局样式 + --fp-* CSS 变量系统
├── consts.ts            # 全局配置（站点信息、API、安全中转、关于页等）
└── env.d.ts
public/
├── js/                  # 前端脚本（AI summary, lightbox, TOC 等）
└── fonts/               # 本地字体文件
```

## 配置

### 站点配置

编辑 `src/consts.ts`：

```ts
export const SITE_URL = "https://blog.081531.xyz";
export const SITE_TITLE = "喵洛阁";
export const SITE_DESCRIPTION = "...";
export const EMAIL = "mcy@kemiaosw.top";
```

### 友链系统配置

```ts
export const FRIENDLINK_API = "https://verify.081531.xyz";   // 友链申请 API
export const FRIEND_DATA_URL = "https://friends-api.081531.xyz/link.yml";  // 远程友链 YAML
export const LATENCY_API_URL = "https://fc.081531.xyz/link.json";  // 延迟检测数据
```

远程 YAML 数据格式（Butterfly 主题兼容）：

```yaml
- class_name: 小伙伴们
  class_desc: 一起友好地交流
  link_list:
    - name: 站点名
      link: https://example.com
      avatar: https://example.com/avatar.png
      descr: 简介
      siteshot: https://example.com/snapshot.jpg
      feeds: https://example.com/atom.xml
```

### 外链安全中转配置

```ts
export const SAFEGO = {
  enable: true,             // 启用外链替换
  enableBase64Encode: true, // 对 URL 做 base64 编码
  urlParamName: "u",        // URL 参数名
  applyContainers: ["article"],  // 应用范围
  excludeSelectors: ["header a", ".friend-card a", ...],
  domainWhitelist: ["blog.081531.xyz", "localhost"],
  avatar: "/favicon.ico",
  countdownTime: 4,         // 倒计时秒数
};
```

### Giscus 评论配置

```ts
export const GISCUS_CONFIG = {
  repo: "kmoretti/blog",
  repoId: "R_kgDOS9I8wA",
  category: "评论",
  categoryId: "DIC_kwDOS9I8wM4C_VFM",
  mapping: "pathname",
  // ...
};
```

## 内容管理

### 写文章

在 `src/content/posts/` 下创建文件夹，放入 `index.mdx` 文件：

```mdx
---
title: 文章标题
description: 文章描述
date: 2024-01-01
tags: ["标签1", "标签2"]
categories: ["分类"]
image: "/static/banner.png"
---

文章正文内容...

import { Alert } from "../../components/posts/Alert.astro";

<Alert type="tip">这是一条提示</Alert>
```

### 关于页面

详细配置见 `src/consts.ts` 的 `ABOUT_PAGE` 对象，可定制：

- Hero 区域（头像、格言、漂浮标签）
- 个人信息清单
- 写作取向
- 技能与工具（图标 + 标签云）
- 社交联系（GitHub、邮箱、Telegram）
- 最近项目
- 自我评价

## 主题定制

### CSS 变量系统

编辑 `src/styles/global.css` 中的 `--fp-*` 变量即可全局换肤：

```css
:root {
  --fp-bg: #f7f3e9;           /* 页面背景 */
  --fp-paper: #fffdf6;         /* 卡片/纸张底色 */
  --fp-ink: #2c3531;           /* 主文字色 */
  --fp-accent: #6fa67c;        /* 强调色（植物绿） */
  --fp-tape: rgba(238,201,110,0.72);  /* 胶带色 */
  /* ... */
}
html.dark { /* 暗色模式覆盖值 */ }
```

### 设计风格更换

更换 `--fp-accent` 主色即可改变全站氛围。支持任何色相值，所有组件通过 `color-mix()` 和 CSS 变量动态适配。

## 部署

本项目为纯静态输出（`output: "static"`），可部署至任意静态托管平台。

### Cloudflare Pages

参照官方文档配置即可，无需额外适配。自动检测 `astro build` 输出 `dist/` 目录。

## 许可证

- **源码**：MIT License (see [LICENSE](LICENSE))
- **文章内容**：[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans)

使用本仓库源码时，请务必替换配置信息（网站标题、个人资料、友链数据等）为你自己的内容。

---

<samp>喵洛阁 · <a href="https://blog.081531.xyz">blog.081531.xyz</a></samp>
