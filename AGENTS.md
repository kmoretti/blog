# AGENTS.md

## Purpose

This repository is a content-driven personal blog built with Astro. Agents working in this repo should optimize for safe, minimal changes that preserve the site's existing writing, routing, and visual style.

## Project Snapshot

- Framework: Astro 5
- Language: TypeScript
- Styling: Tailwind CSS
- Package manager: `pnpm` (lockfile is `pnpm-lock.yaml`)
- Content system: `astro:content`
- Deployment model: static build with GitHub Actions and server sync
- Primary language of the site: Chinese

## Primary Commands

Run commands from the repository root.

- Install dependencies: `pnpm install`
- Start local dev server: `pnpm dev`
- Run Astro type/content checks and production build: `pnpm build`
- Preview production build: `pnpm preview`
- Format the repository: `pnpm format`
- Check formatting only: `pnpm format:check`

## Directory Guide

- `src/pages/`: route entrypoints
- `src/layouts/`: shared page shells
- `src/components/`: reusable UI components
- `src/content/`: content collections and Markdown posts
- `src/content/posts/`: blog posts
- `src/content/friends/`: friend-link related content
- `src/styles/`: global styling
- `src/lib/`: utility code
- `public/`: static assets shipped as-is
- `.github/workflows/`: CI/CD workflows

## Content Rules

- New posts should generally live in `src/content/posts/`.
- Content schema is defined in `src/content/config.ts`; keep frontmatter aligned with that schema.
- Current `posts` schema requires:
  - `title`
  - `description`
  - `date`
- `image` is optional and defaults in the schema.
- Preserve existing permalink patterns and the current trailing-slash behavior configured in `astro.config.mjs`.
- Do not rename, move, or delete published content files unless the task explicitly requires it.

## Coding Rules

- Prefer small, local edits over broad refactors.
- Follow existing Astro component patterns before introducing new abstractions.
- Keep TypeScript compatible with the current config; do not add tooling churn without a clear need.
- Reuse existing utilities in `src/lib/` when practical.
- Keep styles consistent with the current Tailwind-based approach.
- Preserve the existing self-hosted font strategy and current theme behavior unless a task explicitly changes them.

## Routing And SEO

- The site uses `trailingSlash: "always"`; keep generated links and routes consistent with that.
- Preserve canonical/meta behavior in shared layout files unless the task is specifically about SEO or metadata.
- Treat `src/consts.ts` as the source of truth for site-level metadata such as URL and title.

## CI/CD Notes

- There is an existing GitHub Actions workflow in `.github/workflows/build.yml`.
- Avoid changing deployment behavior, branch targets, or server sync logic unless the task is explicitly about deployment.
- If a change affects build output, prefer validating with `pnpm build`.

## Agent Workflow Expectations

- Read relevant files before editing.
- Prefer root-cause fixes over superficial patches.
- Keep diffs focused and easy to review.
- Do not introduce new dependencies unless they are necessary for the requested task.
- Do not switch package managers.
- If content text appears garbled in terminal output, verify file encoding before editing; avoid accidental re-encoding.

## Validation

For non-trivial code changes, prefer this validation order:

1. `pnpm format:check`
2. `pnpm build`

If validation cannot be run, state that clearly in the final handoff.

## Safe Change Boundaries

- Safe by default:
  - content additions
  - isolated component fixes
  - styling tweaks within existing patterns
  - metadata fixes
- Use extra caution with:
  - `astro.config.mjs`
  - `src/content/config.ts`
  - shared layouts
  - deployment workflow files
  - site-wide constants in `src/consts.ts`

## Handoff Notes

When finishing work in this repo, report:

- what changed
- whether `pnpm build` was run
- any assumptions or remaining risks
