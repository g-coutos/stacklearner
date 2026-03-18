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

**Key functions in `/lib/articles.ts`:**
- `getAllArticles()` — returns all published articles with slug, metadata, and reading time.
- `getArticleBySlug(slug)` — returns a single article with parsed HTML content; calls `notFound()` if missing.
- `getAllTags()` — collects all unique tags across published articles, slugified and sorted.
- `getArticlesByTag(tagSlug)` — filters articles by a tag slug.
- `getReadingTime(content)` — estimates read time at 200 wpm, stripping code blocks and Markdown syntax before counting.
- `toSlug(tag)` — normalizes tag strings to lowercase hyphenated slugs (used for URL-safe tag filtering).

### Routing

- `/` — Home page with profile and navigation
- `/articles` — Lists all published articles, sorted newest first; supports `?tag=<slug>` query param for tag filtering
- `/articles/[slug]` — Dynamic article page, statically generated via `generateStaticParams()`

### Components

`/components/` contains layout primitives: `Header` (with optional back button), `Main`, `Footer`, `BackToHome`, and `Typography` wrappers. These are thin layout components — keep them that way.

- `TagBadge` — renders a single tag as a link to `/articles?tag=<slug>`, with an `active` prop to highlight the current filter.
- `TagFilter` — async server component that fetches all tags via `getAllTags()` and renders an "All" link plus a `TagBadge` per tag. Used at the top of `/articles`.

### Styling

Tailwind CSS v4 configured through `app/globals.css` using `@theme inline`. Custom CSS variables define colors (`--fluorescent-yellow`) and fonts (`--font-serif` for Instrument Serif, `--font-mono` for DepartureMono). The `@tailwindcss/typography` plugin is used for article prose rendering with customizations in `globals.css`.

### Utilities

`/lib/utils.ts` exports a `cn()` function combining `clsx` and `tailwind-merge`. The path alias `@/*` maps to the root directory.
