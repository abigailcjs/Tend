# Tend — Project Brief for Claude Code

You are helping build **Tend**, a Progressive Web App synthesizing two books: *Psycho-Cybernetics* (Maxwell Maltz, 1960) and *Atomic Habits* (James Clear, 2018).

## Start here

1. **Read `SPEC.md`** — the complete product spec. Vision, data model, full UX architecture, design system, voice & copy, tech stack, 9-phase build plan, and principles. Everything you need.
2. **Look at `canva/`** — five React JSX files generated from Canva that define the UI and design system. Read `canva/README.md` for context before opening the JSX files.
3. Current state: design + spec complete, no code yet. We're at the start of **Phase A — Foundation** in the build plan.

## Before you start coding

Confirm with the user:

- That you've read `SPEC.md` and understood the concept (identities as the spine, bookend rhythm, modular practice).
- That you understand the design language from the Canva files (italic-serif gestures, CSS variables, identity colors, motion classes).
- That you understand the voice (calm, present-tense, never gamified — see "Voice & copy" in SPEC.md).
- The next concrete step you propose for Phase A (typically: Next.js scaffold + Tailwind + shadcn/ui + Supabase project + Drizzle).

Then proceed step-by-step, getting the user's approval at each major decision. The user prefers slow, deliberate work — "design it right, build slowly."

## Stack (locked)

- **Frontend:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui + CSS variables for theme tokens (use the variable system from the Canva files)
- **Motion:** Framer Motion (recreate `tend-fade`, `tend-rise`, `tend-breath` as React components/utilities)
- **Backend:** Supabase (Postgres + Auth + RLS + Edge Functions + Storage)
- **ORM:** Drizzle ORM
- **Client state:** TanStack Query + Zustand
- **PWA:** next-pwa + Workbox
- **Notifications:** Web Push API
- **Dates:** date-fns + date-fns-tz
- **Icons:** lucide-react (the Canva files use `Icon*` placeholder names that map cleanly to lucide)
- **Deployment:** Vercel + Supabase Cloud

## Non-negotiables

- **Voice.** All microcopy in the Canva files is intentional. Preserve it. The "Voice anchors" table in SPEC.md lists locked lines.
- **One block per screen** in the practice flow. Never multi-block scrolling.
- **Identity-first.** Every habit must reference an identity (FK, not null). No orphan habits.
- **Compassion in the math.** Streaks use Clear's "never miss twice" rule. No shame language.
- **Privacy from day 1.** Supabase row-level security from the first migration.
- **No gamification.** No badges, no streak-loss panic, no FOMO. The app is a friend, not a casino.

## What to do at the end of any work session

If the project structure changes meaningfully or if a major decision gets made, update `SPEC.md` accordingly. The spec is a living document — keep it in sync so a future Claude Code session (or human collaborator) can pick up where this one left off.
