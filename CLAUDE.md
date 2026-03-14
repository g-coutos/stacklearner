# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**Stack Learner** is a personal blog built with Next.js App Router, React 19, Tailwind CSS v4, and TypeScript.

### Content System

Articles are `.md` files in `/articles/` with YAML frontmatter:

```markdown
---
title: "Article Title"
description: "Short description"
date: "2026-01-27"
tags: ["tag1", "tag2"]
published: true
---
```

`/lib/articles.ts` reads and parses these files using `gray-matter`. Only articles with `published: true` are shown. `/lib/markdown-to-html.ts` converts content to HTML via a remark/rehype pipeline with syntax highlighting via `rehype-prism-plus`.

### Routing

- `/` — Home page with profile and navigation
- `/articles` — Lists all published articles, sorted newest first
- `/articles/[slug]` — Dynamic article page, statically generated via `generateStaticParams()`

### Components

`/components/` contains layout primitives: `Header` (with optional back button), `Main`, `Footer`, `BackToHome`, and `Typography` wrappers. These are thin layout components — keep them that way.

### Styling

Tailwind CSS v4 configured through `app/globals.css` using `@theme inline`. Custom CSS variables define colors (`--fluorescent-yellow`) and fonts (`--font-serif` for Instrument Serif, `--font-mono` for DepartureMono). The `@tailwindcss/typography` plugin is used for article prose rendering with customizations in `globals.css`.

### Utilities

`/lib/utils.ts` exports a `cn()` function combining `clsx` and `tailwind-merge`. The path alias `@/*` maps to the root directory.
