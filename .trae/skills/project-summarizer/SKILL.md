---
name: "project-summarizer"
description: "总结 Astro 项目的逻辑、框架和结构，更新 AGENTS.md。当用户说「帮我总结本项目」「总结项目」「更新 AGENTS.md」或类似指令时触发。"
---

# 项目总结技能 (Project Summarizer)

当用户说 **"帮我总结本项目"** 或类似指令时触发此技能。

## 行为

1. **读取项目关键文件**：读取根目录的 `README.md`、`package.json`、`astro.config.mjs`、`tsconfig.json`、`tailwind.config.ts` 以及主要目录结构。
2. **分析项目**：
   - 项目名称、描述、用途
   - 框架与技术栈（Astro 版本、TypeScript、Tailwind CSS、集成等）
   - 目录结构与各目录职责
   - 关键配置（构建命令、部署方式、SEO 设置）
   - 内容系统（content collections schema、posts 结构）
   - 路由结构（pages 目录布局）
   - 自定义组件概况
   - CI/CD 流程
   - 代码规范与格式化工具
3. **输出到 AGENTS.md**：将上述分析结果以清晰结构写入或更新根目录的 `AGENTS.md`，包含：
   - **Purpose** — 项目核心用途
   - **Project Snapshot** — 技术栈概览
   - **Primary Commands** — 关键命令
   - **Directory Guide** — 目录结构说明
   - **Content Rules** — 内容管理规范
   - **Coding Rules** — 编码约定
   - **Routing And SEO** — 路由与 SEO 配置
   - **CI/CD Notes** — 部署说明
   - **Safe Change Boundaries** — 安全修改边界
   - **Handoff Notes** — 交接说明

## 注意事项

- 保持 `AGENTS.md` 格式清晰，便于 AI agent 和人阅读。
- 不要删除或覆盖现有 `AGENTS.md` 中用户手动添加的内容 — 应当合并更新。
- 如果 `AGENTS.md` 已存在，应保留原有内容并补充遗漏的章节。
- 使用中文书写大部分内容，技术术语（框架名、命令等）保留英文。
