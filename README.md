# Stack Learner

A personal blog built with Next.js App Router, React 19, Tailwind CSS v4, and TypeScript. Articles are written in Markdown with YAML frontmatter and statically generated at build time.

## Stack

- **Next.js** (App Router) — routing and static generation
- **React 19** — UI
- **Tailwind CSS v4** — styling, with custom design tokens in `app/globals.css`
- **TypeScript** — type safety
- **gray-matter** — Markdown frontmatter parsing
- **remark / rehype** — Markdown-to-HTML pipeline
- **rehype-prism-plus** — syntax highlighting

## Project Structure

```
/articles/        # Markdown article files
/app/             # Next.js App Router pages
/components/      # Layout primitives (Header, Footer, Main, etc.)
/lib/             # Core utilities (articles.ts, markdown-to-html.ts, utils.ts)
```

## Content

Articles live in `/articles/` as `.md` files with the following frontmatter:

```markdown
---
title: "Article Title"
description: "Short description"
date: "2026-01-27"
tags: ["tag1", "tag2"]
published: true
---
```

Only articles with `published: true` are displayed. They are sorted by date, newest first.

## Routes

- `/` — Home page with profile and navigation
- `/articles` — Lists all published articles
- `/articles/[slug]` — Individual article page (statically generated)

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
