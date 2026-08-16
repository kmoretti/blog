目标：新增 GitHub Actions 直传 Cloudflare Pages 的生产部署流程，并将普通友链 YAML、延迟 API 也改为浏览器端刷新请求。这样 GitHub 负责构建，Cloudflare Pages 不产生构建次数；用户刷新 `/friends/` 或 `/friends/friends/` 时可取得远程数据的最新响应。

1. 先验证运行时前提与现有行为：检查三个远程端点的浏览器 CORS 响应头，确认 jsDelivr 的普通/失效友链 YAML 以及 `fc.081531.xyz/link.json` 均能被博客域名跨域读取。保持所有请求的 `cache: "no-store"`，避免浏览器主动复用旧响应。若某个端点无法跨域访问，停止在该边界并报告，而不在静态站点中加入未经验证的代理方案。

2. 抽取浏览器安全的普通友链数据加载逻辑：将 `src/lib/friends.ts` 中的 YAML 数据结构、校验、字段规范化与分组逻辑迁移为可由页面 `<script>` 使用的共享模块，使用 `js-yaml/browser`。正常数据会验证组数组、过滤无名称或无 HTTP(S) 主链接的记录、规范化描述/快照/RSS/友链页/标签；远程文字均以 `textContent` 写入 DOM，避免将 YAML 作为 HTML 注入。

3. 改造简洁友链页 `src/pages/friends/index.astro`：删除构建期 `fetchFriends()`；保留现有网格与头像样式，替换为固定容器和加载状态。客户端在 `astro:page-load` 拉取普通 YAML，成功后渲染与当前等价的外链头像项；头像加载失败时隐藏图片而不破坏链接布局。网络、HTTP、YAML 或结构错误时在原位置显示简洁可访问的失败提示，不把远程服务故障误显示为“空友链列表”。

4. 改造详细友链页 `src/pages/friends/friends.astro`：删除 frontmatter 中正常友链和延迟 API 的构建期请求、映射及派生展示数据，保留标题、卡片所有现有 class 层级、失效友链区块和申请入口。
   - 初始静态 HTML 提供地址稳定的分组容器、加载状态与中性统计文案。
   - 页面客户端并行拉取普通 YAML 与延迟 JSON。普通 YAML 成功后立即生成当前同构的分组与卡片 DOM，初始延迟标记为“检测中”。
   - 延迟请求成功后按当前规则同时匹配主站 URL 和友链页 URL，只更新对应卡片的延迟文字与 `fast/ok/slow/down/idle` class；延迟接口失败或非 2xx 时保留“检测中”，不阻塞友链内容。
   - 现有失效友链客户端加载保持不变，并调整查询时机以适应 `ClientRouter` 页面切换，确保每次刷新或导航进入页面都会针对当前 DOM 请求和渲染。

5. 用新的 `.github/workflows/deploy.yml` 替代现有生成 `deploy` 分支的发布路径，避免每次 `main` 推送重复构建：
   - 触发条件为 `main` 推送和手动触发。
   - 保持现有锁定工具链：pnpm `10.30.3`、Node `22.12.0`、`pnpm install --frozen-lockfile`、`pnpm build`。
   - 使用官方 `cloudflare/wrangler-action@v4` 执行 `pages deploy dist`，将 GitHub Actions 构建出的产物上传至 Cloudflare Pages，明确标记 `--branch=main`。
   - 从原 `build.yml` 移除/退役强制推送 `deploy` 分支的工作流，确保只保留一条生产发布链路。
   - 工作流通过 GitHub Actions 配置读取 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID` 两个 Secrets，以及 `CLOUDFLARE_PAGES_PROJECT` repository variable。不会把 token、账号 ID 或项目名写入仓库。

6. 更新部署说明中已过时的“Cloudflare 自动构建/部署分支”描述，说明 Pages 项目需配置为 Direct Upload，且在 Cloudflare 项目中关闭 Git 集成自动构建。GitHub 侧需配置：
   - `CLOUDFLARE_API_TOKEN`：仅授予目标账户的 Account > Cloudflare Pages > Edit。
   - `CLOUDFLARE_ACCOUNT_ID`：目标 Cloudflare 账户 ID。
   - `CLOUDFLARE_PAGES_PROJECT`：目标 Pages 项目名称。
   同时保留自定义域名在 Pages 项目中配置；部署方式不会改变站点 URL。

7. 验证：运行格式检查（针对修改文件）、`pnpm install --frozen-lockfile`、`pnpm build`；启动预览并用浏览器验证 `/friends/`、`/friends/friends/` 的初始加载、普通友链实时渲染、延迟样式更新、远程数据异常降级、失效友链加载及移动端布局。检查工作流 YAML 语法和其不会再写入 `deploy` 分支。