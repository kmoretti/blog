# 项目文档 — feny-blog

## 概览

这是一个基于 **Astro 5** 构建的中文个人博客，项目名称 **feny-blog**（v4.0.0），采用静态站点生成（SSG）模式，通过 GitHub Actions 自动构建并部署到 `deploy` 分支。

- **站点地址**：https://blog.081531.xyz
- **站点名称**：喵洛阁
- **作者**：克喵 Moretti

---

## 技术栈

| 类别          | 技术                                                                |
| ------------- | ------------------------------------------------------------------- |
| 框架          | Astro 5                                                             |
| 语言          | TypeScript（strict 模式）                                           |
| 样式          | Tailwind CSS 3（class 暗色模式）                                    |
| 内容          | `astro:content` + MDX                                               |
| 图标          | astro-icon + Iconify（mdi / ion / material-symbols / skill-icons）  |
| 字体          | Noto Sans SC / Noto Serif SC / Noto Sans Mono（@fontsource 自托管） |
| 代码高亮      | Shiki（catppuccin-latte / catppuccin-mocha 双主题）                 |
| 搜索          | Pagefind（构建时生成索引）                                          |
| 评论          | Giscus（基于 GitHub Discussions）                                   |
| 分析          | Umami                                                               |
| 包管理器      | pnpm 9                                                              |
| 格式化        | Prettier + prettier-plugin-astro + prettier-plugin-tailwindcss      |
| Markdown 增强 | remark-gfm + remark-github-blockquote-alert                         |

---

## 目录结构

```
blog/
├── .github/workflows/
│   └── build.yml              # CI/CD：构建 + 推送 dist 到 deploy 分支
├── public/                    # 静态资源（原样复制）
│   ├── fonts/                 # 自托管字体文件（Geist Mono / Geist / Material Symbols）
│   ├── js/                    # 客户端脚本（lightbox / TOC / BSZ / AI摘要）
│   ├── avatar.jpeg            # 头像
│   ├── banner.png             # 默认文章封面
│   ├── favicon.png            # 站点图标
│   └── friend.json            # 友链数据（FCircle Lite 兼容格式）
├── scripts/                   # 构建辅助脚本
│   ├── add-friend.mjs         # 友链自动添加入库脚本
│   ├── generate-fcircle-data.mjs  # FCircle Lite 友链数据生成
│   └── generateSummary.ts     # AI 摘要生成脚本
├── src/
│   ├── assets/styles/
│   │   └── aisummary.css      # AI 摘要组件样式
│   ├── components/            # 可复用 Astro 组件
│   │   ├── about/             # About 页面专用组件
│   │   ├── Giscus.astro       # 评论系统
│   │   ├── Header.astro       # 页头导航
│   │   ├── Heatmap.astro      # 热力图
│   │   ├── PostMetaChips.astro # 文章元信息标签
│   │   ├── PostSearch.astro   # 文章搜索
│   │   ├── TableOfContents.astro # 文章目录
│   │   ├── TaxonomyCloud.astro   # 标签/分类云
│   │   └── ThemeToggle.astro  # 明暗模式切换
│   ├── content/               # 内容集合
│   │   ├── config.ts          # 集合 schema 定义
│   │   ├── friends/           # 友链相关页面内容
│   │   └── posts/             # 博客文章（MDX 格式）
│   ├── data/
│   │   └── friends.json       # 友链数据源
│   ├── layouts/
│   │   └── Layout.astro       # 全局布局（含主题初始化、SEO 元数据、View Transitions）
│   ├── lib/
│   │   ├── heatmap.ts         # 热力图数据逻辑
│   │   └── utils.ts           # 通用工具函数（cn 等）
│   ├── pages/                 # 路由页面
│   │   ├── index.astro        # 首页
│   │   ├── about.astro        # 关于页
│   │   ├── posts/             # 文章列表 + 文章详情
│   │   ├── categories/        # 分类归档 + 分类详情
│   │   ├── tags/              # 标签归档 + 标签详情
│   │   ├── friends/           # 友链相关（友链页 / 交换页 / 朋友圈 / 展示页）
│   │   ├── robots.txt.ts      # robots.txt 动态生成
│   │   └── rss.xml.js         # RSS Feed
│   ├── plugins/               # 客户端插件
│   │   ├── aisummary.config.js # AI 摘要配置
│   │   └── aisummary.js       # AI 摘要逻辑
│   ├── styles/
│   │   └── global.css         # 全局样式（字体导入 + Tailwind + 文章排版 + 暗色适配）
│   ├── consts.ts              # 站点常量（URL / 标题 / 关于页数据 / Giscus 配置）
│   └── env.d.ts               # 环境变量类型声明
├── astro.config.mjs           # Astro 配置
├── tailwind.config.ts         # Tailwind 配置
├── tsconfig.json              # TypeScript 配置（继承 astro/tsconfigs/strict）
├── package.json               # 项目配置与依赖
└── .env                       # 环境变量（如 AI API Key，不提交到仓库）
```

---

## 路由结构

| 路径                  | 页面     | 说明                      |
| --------------------- | -------- | ------------------------- |
| `/`                   | 首页     | 博客入口                  |
| `/posts/`             | 文章列表 | 按页码分页                |
| `/posts/[page]/`      | 文章分页 | 动态分页                  |
| `/posts/[...slug]/`   | 文章详情 | MDX 文章渲染              |
| `/categories/`        | 分类列表 | 所有分类                  |
| `/categories/[slug]/` | 分类详情 | 按分类筛选                |
| `/tags/`              | 标签列表 | 所有标签                  |
| `/tags/[slug]/`       | 标签详情 | 按标签筛选                |
| `/about/`             | 关于页   | 个人介绍                  |
| `/friends/`           | 友链页   | 友情链接展示              |
| `/friends/exchange/`  | 友链交换 | 交换说明                  |
| `/friends/fcircle/`   | 朋友圈   | FCircle Lite 友链文章聚合 |
| `/rss.xml`            | RSS      | RSS 订阅                  |
| `/robots.txt`         | Robots   | 搜索引擎爬虫规则          |

所有路由均使用 **尾部斜杠**（`trailingSlash: "always"`）。

---

## 内容系统

### 文章 Schema（`src/content/config.ts`）

```typescript
{
  title: string;          // 必填
  description: string;    // 必填
  date: Date;             // 必填（自动解析）
  image?: string;         // 可选，默认 "/static/banner.png"
  tags: string[];         // 可选，默认 []
  categories: string[];   // 可选，默认 []
  summary?: string;       // 可选（AI 摘要）
}
```

文章存放于 `src/content/posts/`，每篇文章一个目录，包含 `index.mdx`。

### 友链 Schema

```typescript
{
  title?: string;
  description?: string;
}
```

友链内容存放于 `src/content/friends/`。

---

## 主题与暗色模式

- 暗色模式通过 Tailwind 的 `class` 策略实现（`html.dark`）。
- 主题初始化脚本在 `Layout.astro` 中以 `is:inline` 方式运行，在首次绘制前应用主题，避免白闪。
- 支持用户手动切换（localStorage 持久化）和跟随系统偏好。
- 兼容 Astro View Transitions，在页面切换时保持主题状态同步。

---

## 字体策略

所有字体通过 `@fontsource` 包自托管，避免依赖外部 CDN：

- **正文**：Noto Sans SC（拉丁字符）+ Noto Serif SC（CJK 字符，通过 unicode-range 自动回退）
- **代码**：Noto Sans Mono

---

## 常用命令

```bash
pnpm install        # 安装依赖
pnpm dev            # 启动本地开发服务器
pnpm build          # 类型检查 + 构建 + Pagefind 索引生成
pnpm preview        # 预览生产构建
pnpm format         # 格式化代码
pnpm format:check   # 检查代码格式
```

---

## CI/CD 部署

GitHub Actions 工作流（`.github/workflows/build.yml`）在推送到 `main` 分支时自动执行：

1. Checkout 代码
2. 设置 pnpm 9 + Node.js 20
3. 安装依赖（`pnpm install --frozen-lockfile`）
4. 构建站点（`pnpm build`）
5. 将 `dist/` 目录推送到 `deploy` 分支

---

## 关键配置

- **站点常量**：`src/consts.ts` — 站点 URL、标题、描述、关于页数据、Giscus 评论配置
- **Astro 配置**：`astro.config.mjs` — 集成、Markdown 插件、代码高亮主题
- **Tailwind 配置**：`tailwind.config.ts` — 字体族、暗色模式策略
- **环境变量**：`.env` — API 密钥等敏感配置（不入版本控制）
