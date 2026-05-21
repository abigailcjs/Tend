# Tend — Next.js port

Phase A scaffold of the app described in [SPEC.md](./SPEC.md). All five Canva screens are ported to Next.js App Router + TypeScript with the design system intact (CSS variables, three aesthetics × light/dark, italic-serif gestures, `tend-fade` / `tend-rise` / `tend-breath` motion).

## Run it

```sh
pnpm install
pnpm dev          # http://localhost:3000
```

The tiny "tweaks" chip in the bottom-right flips aesthetic, dark mode, today-state, and triggers practice sessions. It's gated to `NODE_ENV !== 'production'`.

## What's wired

| Screen | Route |
|---|---|
| Today (4 states) | `/` |
| Habits | `/habits` |
| Journal | `/journal` |
| Identities list | `/identities` |
| Identity detail | `/identity/[id]` |
| Practice flow | overlay (triggered from Today) |

Shared state lives in Zustand (`src/lib/store.ts`), persisted to localStorage so habit check-offs survive reloads.

## What's stubbed

- **Data:** in-memory demo data in `src/lib/demo-data.ts` (mirrors the prototype). The `src/lib/data-source.ts` adapter is the seam: screens read through it; when `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set, swap the bodies for real queries.
- **Auth:** Supabase magic-link not wired yet (Phase A end goal).
- **Notifications:** manifest is in place; service worker is minimal. Web Push lands in Phase G.

## What's ready to attach

- **Drizzle schema:** `db/schema.ts` — mirrors the data model in SPEC.md.
- **SQL migration:** `supabase/migrations/0001_initial.sql` — tables + enums + RLS policies (owner-only, joined through identities).
- **Streak math:** `src/lib/streak.ts` — Clear's "never miss twice" rule, scheduled-days aware.

## Project layout

```
src/
  app/
    layout.tsx        # root shell
    page.tsx          # Today
    habits/page.tsx
    journal/page.tsx
    identities/page.tsx
    identity/[id]/page.tsx
    globals.css       # design tokens, motion classes
  components/
    app-shell.tsx     # phone-style frame, tab bar, profile sheet, practice overlay
    tab-bar.tsx
    profile-sheet.tsx
    dev-tweaks.tsx    # floating dev panel (NODE_ENV gated)
    icons.tsx         # the line icon set
    service-worker.tsx
    today/today.tsx
    habits/habits.tsx
    journal/journal.tsx
    identity/identity-detail.tsx
    identity/identities-list.tsx
    practice/practice.tsx
    practice/blocks.tsx   # all 9 block types
  lib/
    types.ts
    demo-data.ts
    store.ts          # Zustand + localStorage persist
    streak.ts         # never-miss-twice math
    data-source.ts    # demo ↔ Supabase swap point
db/schema.ts
supabase/migrations/0001_initial.sql
public/manifest.webmanifest
public/sw.js
```
