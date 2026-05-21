# Tend

A Progressive Web App that helps you build a desired self-image through daily
practice, and reinforce it through habits that vote for the identity you're
becoming.

Synthesizes *Psycho-Cybernetics* (Maltz, 1960) and *Atomic Habits* (Clear, 2018).

> "I tend to who I'm becoming."

## Status

**Phase A — Foundation.** Visual shell in place; backend, auth, and PWA shell
pending. See [SPEC.md](SPEC.md) for the full product spec and 9-phase build
plan. See [CLAUDE.md](CLAUDE.md) for the project brief for AI assistants.

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The design preview lives
at [/preview](http://localhost:3000/preview).

## Build

```bash
pnpm build      # production build
pnpm start      # serve the built app locally
pnpm lint       # ESLint
```

## Deploy (Vercel)

First time on this machine:

```bash
pnpm exec vercel login         # opens browser; pick the right account
pnpm exec vercel link          # picks/creates the Vercel project
```

Then either of:

```bash
pnpm deploy                    # preview deploy
pnpm deploy:prod               # production deploy
```

After `vercel link`, a `.vercel/` directory is created locally. It's
gitignored — each contributor links their own checkout. The Vercel project
itself remains shared.

For CI / non-interactive deploys, set `VERCEL_TOKEN` and pass
`--token=$VERCEL_TOKEN` to the `vercel` invocations.

## Stack

Locked choices, see SPEC.md § *Technical stack* for the full list.

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS 4 (CSS-first `@theme` config, no `tailwind.config.ts`)
- Framer Motion for `tend-fade` / `tend-rise` / `tend-breath`
- Supabase (Postgres + Auth + RLS + Storage) — *not yet wired*
- Drizzle ORM — *not yet wired*
- TanStack Query + Zustand — *not yet wired*
- `next-pwa` / `@serwist/next` — *not yet wired*

## Repo layout

```
canva/             Canva-exported JSX — the canonical visual reference
src/app/           Next.js App Router
  globals.css      Design tokens (CSS vars) + utility classes + keyframes
  layout.tsx       Root layout + next/font wiring
  page.tsx         Landing → links to /preview
  preview/         Static port of canva/today.jsx (will move/delete in Phase C)
public/            Static assets
SPEC.md            Product spec, data model, voice, build plan
CLAUDE.md          AI-assistant brief
AGENTS.md          Next.js 16 specific guidance for code agents
```
