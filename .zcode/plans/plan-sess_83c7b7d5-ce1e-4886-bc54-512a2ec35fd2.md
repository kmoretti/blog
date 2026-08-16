目标：在 `/friends/friends/` 的正常友链分组后添加“失效友链”区域，区域下方提供前往现有 `/friends/exchange/` 申请表单的更新入口。数据来自 `link-false.yml`，每次浏览器刷新页面时请求，不依赖 Astro 构建时数据；失效条目不跳转原站，只显示头像和名称，头像缺失或加载失败时仅显示名称。

1. 在 `src/consts.ts` 新增 `FRIEND_FALSE_DATA_URL`，值为用户指定的 `https://cdn.jsdmirror.com/gh/kmoretti/butterfly-link-check@main/link-false.yml`。这与现有 `FRIEND_DATA_URL` 保持同一处配置，且不触及已有正常友链数据源。

2. 修改 `src/pages/friends/friends.astro`：在现有 `.friend-groups` 正常友链列表之后放置一个初始隐藏的“失效友链”语义化区域，再在其后添加简洁的“友链申请”提示和链接到 `/friends/exchange/`。失效区包含说明文字，引导已恢复站点通过下方申请表单更新资料，不提供“联系恢复”功能。

3. 在同一页面添加经 Astro/Vite 打包的浏览器脚本，导入 `js-yaml/browser` 与 `FRIEND_FALSE_DATA_URL`。脚本会以 `cache: "no-store"` 拉取 YAML，在客户端校验顶层数组和 `record.entry` 对象，仅采用有名称的条目；使用 DOM API 创建紧凑的头像加名称条目，避免把远端文本拼接为 HTML。请求、解析或数据格式异常时只记录警告并维持失效区隐藏，正常友链页仍可用。

4. 为动态头像设置错误处理：无头像 URL 时不创建图片；图片触发 `error` 时将其移除，因此始终保留名称且不会显示破图占位。条目将是不可点击的静态内容，不会把访客带到已失效原站。

5. 为失效区增加与现有纸张风格、明暗主题和移动端布局一致的局部 CSS：虚线说明框、可换行的紧凑头像名称列表，以及通向申请页的低干扰行动链接。正常友链卡片与构建期友链解析代码不作改动。

6. 验证：运行 `pnpm format:check` 和 `pnpm build`；检查构建产物能打包浏览器端 YAML 解析模块且 TypeScript/Astro 检查通过。若本地浏览器环境可用，再以开发服务器直接访问 `/friends/friends/`，确认远端数据在浏览器加载后出现、`.invalid` 头像失败时名称仍可见、条目不含外链、申请入口正常指向 `/friends/exchange/`。