目标与验收标准：将站点从 Astro 5 升级至当前稳定版 Astro 7，同时升级其必要集成和构建链；继续使用 pnpm；保持现有文章 URL、尾随斜杠、静态部署及页面布局样式；在安装网络缓慢时使用较长超时。完成以锁文件、生产构建、CI 等价冻结安装及代表性页面运行时验证为依据，而非只修改 `package.json`。

1. 先记录基线并保护现有工作区改动：检查当前依赖树、`pnpm build`、关键路由的构建产物和现有样式入口。不会重置或覆盖当前未提交的友链改动及未跟踪目录。

2. 更新 `package.json`、`pnpm-lock.yaml` 与 CI 工具版本：
   - 升级 `astro` 至当前稳定的 7.x，并同步升级 `@astrojs/mdx`、`@astrojs/check`、`@astrojs/rss`、`@astrojs/sitemap`。
   - 移除不支持 Astro 6/7 的 `@astrojs/tailwind`，迁移到 Tailwind 4 与 `@tailwindcss/vite`。
   - 添加 Astro 7 所需的 `@astrojs/markdown-remark`，保留现有 `remark-gfm`、GitHub alert 和 Shiki 双主题配置。
   - 更新迁移相关的 Prettier Tailwind/导入整理插件；保留 TypeScript 5、字体包、数据处理包和其他无关业务依赖的稳定范围，避免扩大行为变更。
   - 固定 `packageManager` 为 pnpm 10，并把 GitHub Actions 的 pnpm 设置同步到该版本；保留 Node 22 并把 `engines` 明确为 Astro 7 需要的 `>=22.12.0`。
   - 使用 `pnpm install` 的延长网络超时和重试配置生成锁文件；随后用 `pnpm install --frozen-lockfile` 验证可复现安装。

3. 迁移 Astro 6/7 内容集合，不改内容文件与公开路径：
   - 将 `src/content/config.ts` 迁移为 Content Layer 配置 `src/content.config.ts`，改用 `glob()` loader 和 `astro/zod`。
   - 显式生成与现有文件夹名相同的文章 ID，保证 `/posts/<slug>/`、RSS 链接、分页、分类、标签、相邻文章链接和友链申请内容条目保持不变。
   - 全量更新 `CollectionEntry` 使用点，把文章的 `.slug` 改为保留后的 `.id`，把实例 `entry.render()` 改为 `render(entry)`，并保留文章正文读取、阅读统计和 RSS 内容生成行为。

4. 迁移框架集成和样式管线而不改变视觉设计：
   - 在 `astro.config.mjs` 用 `@tailwindcss/vite` 的 Vite 插件替代 Tailwind 集成，并配置 Astro 7 的 Sätteri/Markdown Remark 处理器，保留现有 Remark 插件与 Shiki 主题。
   - 将 `global.css` 的 Tailwind 3 指令改为 Tailwind 4 入口，并显式加载现有 `tailwind.config.ts`，从而保留字体族扩展、class 暗色模式、扫描范围、`@apply` 和全部现有 utility class 的生成行为。
   - 用 Astro 7 的 `<ClientRouter />` 替换已移除的 `<ViewTransitions />`，保留现有 `astro:before-swap` 和 `astro:page-load` 的主题、Giscus、灯箱和脚本重新初始化流程。
   - 先保留已处于最新版本的 `astro-icon` 与当前 SVG 输出；若它在 Astro 7 的检查、构建或代表性页面中失败，再采用静态 SVG 编译方案迁移并覆盖所有动态图标调用，确保图标尺寸、颜色和布局不回归。

5. 审计并修复迁移后的全部诊断：检查 Astro 7 的脚本/样式顺序、MDX/Markdown 组件渲染、内联空白变化、RSS、sitemap、Pagefind、内容元数据、图标、过渡生命周期和 Tailwind utility 输出。仅对已验证的兼容性问题做局部修正，不进行无关重构。

6. 分层验证并完成验收审计：
   - 运行迁移后单文件与全仓格式检查，记录既有 MDX 格式解析问题并确认新增/修改文件均合规。
   - 运行 `pnpm build`，确认 Astro 检查无错误、静态路由与 `dist/pagefind` 均生成。
   - 在清理后的依赖状态下运行 `pnpm install --frozen-lockfile` 和再次 `pnpm build`，验证 CI 可复现性。
   - 启动 `pnpm preview`，检查首页、分页文章、文章详情、分类、标签、友链申请、RSS、sitemap、404 和主要 MDX 组件页面；核对既有 URL、尾随斜杠、深浅色主题、图标、代码高亮、导航过渡、搜索与移动端布局。必要时对升级前后截图做对比，修正可见样式偏差。
   - 最终以变更清单逐项对照：Astro 当前稳定版、必要依赖同步、pnpm 锁定、可冻结安装、无构建/类型错误、正常运行、布局不变。