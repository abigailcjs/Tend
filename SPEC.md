# Tend

**Product Spec — v0.2**
*Last updated: May 21, 2026 (v0.2 — Phase A1 build log added)*

> *"I tend to who I'm becoming."*

---

## About this document

This is the design spec for **Tend**, a Progressive Web App that helps you build a desired self-image through daily practice, and reinforce it through habits that vote for the identity you're becoming.

It synthesizes two books: *Psycho-Cybernetics* by Maxwell Maltz (1960) and *Atomic Habits* by James Clear (2018). The combination is non-obvious and, as far as I can tell, not yet done well in any existing app.

This document is intended to be readable by you (the author/builder), by collaborators you bring on, and by future versions of yourself or AI assistants returning to the project after time away.

---

## Vision

Most habit apps treat habits as the goal. Tend treats habits as evidence — daily votes that reinforce the self-image you're installing through morning and evening practice.

The morning is for **priming** the self-image (affirmations, visualization, mental rehearsal). The day is for **collecting evidence** (habits checked off as votes for who you're becoming). The evening is for **reflection and tomorrow's rehearsal** (reviewing the day, mentally walking through tomorrow). The cycle repeats.

The app's secret weapon: your affirmations and your habits share the same underlying spine — a small set of **identities** you're actively building. One identity has multiple affirmations supporting it, multiple habits voting for it, and one or more visualization scenes you mentally rehearse. The two books, integrated.

---

## Source material

**Psycho-Cybernetics (Maltz, 1960)** — Your self-image is a servo-mechanism that steers behavior toward whatever target it holds. To change behavior, change the inner picture, via vivid mental rehearsal, relaxation, and affirmation. Maltz's prescription was specific: pick the self-image scene you want, rehearse it daily for 21 days, make it vivid and felt.

**Atomic Habits (Clear, 2018)** — Habits compound. The most powerful form of habit change is identity-based: focus on becoming the type of person who does X, not on the outcome. Every action is a vote for the person you wish to become. The four laws make habits sustainable: cue, craving, response, reward.

**The synthesis:** Maltz's self-image is Clear's identity. Maltz updates the self-image through mental work; Clear updates it through behavioral evidence. Tend does both, on the same spine.

---

## Core concept

### Identities are the spine

Everything in Tend hangs off identities. An identity is a statement like *"I'm the kind of person who creates without permission."* Each identity has:

- **Affirmations** that support it (multiple, rotated through during morning practice)
- **Habits** that vote for it (each habit is linked to exactly one primary identity)
- **Visualization scenes** that rehearse it (user-authored, in the spirit of Maltz)

### The bookend rhythm

- **Morning practice** primes the self-image
- **Daytime habit check-ins** collect evidence
- **Evening practice** reflects and rehearses tomorrow

### Modular custom practice

The user assembles their own morning and evening rituals from a library of blocks (see *Block library* below). The app does not prescribe one fixed routine. The user has one morning template and one evening template, editable, with the ability to skip blocks mid-session if a day is rushed.

---

## Data model

```
User
 └── Identity ──┬── Affirmation         (1:many)
                ├── Habit ──── HabitLog (1:many; logs per scheduled day)
                └── VisualizationScene  (1:many)

User
 ├── PracticeTemplate                   (1 morning, 1 evening per user)
 │     └── BlockConfig (ordered list of blocks in the template)
 ├── PracticeSession                    (each session of doing the practice)
 └── JournalEntry                       (polymorphic: future_self / rehearsal /
                                         reflection / gratitude)
```

### Entities

**Identity**

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| user_id | uuid | FK |
| statement | text | e.g. *"I am the type of person who creates daily"* |
| why | text? | optional deeper reason |
| color | text | hex; used for identity dot, accent bars, themed surfaces |
| is_active | bool | can pause without deleting |
| created_at | timestamp | |

**Affirmation**

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| identity_id | uuid | FK, required |
| text | text | |
| is_active | bool | in current rotation, yes/no |
| created_at | timestamp | |

**Habit**

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| identity_id | uuid | FK, required (1 identity per habit) |
| name | text | e.g. "Read 20 pages" |
| days_of_week | int[] | which days scheduled |
| target_type | enum | `boolean` or `quantified` |
| target_value | number? | if quantified |
| target_unit | text? | "pages", "min", etc. |
| cue | text? | Clear's framework |
| craving | text? | |
| response | text? | |
| reward | text? | |
| is_active | bool | |
| created_at | timestamp | |

**HabitLog**

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| habit_id | uuid | FK |
| date | date | one log per scheduled day |
| completed | bool | |
| value | number? | if quantified |
| note | text? | optional reflection |
| created_at | timestamp | |

**VisualizationScene**

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| user_id | uuid | FK |
| identity_id | uuid? | optional link |
| title | text | |
| body | text | the user-written script |
| is_active | bool | in current rotation |
| created_at, updated_at | timestamps | |

**PracticeTemplate**

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| user_id | uuid | FK |
| time_of_day | enum | `morning` or `evening` |
| blocks | jsonb | ordered list of block configs |
| updated_at | timestamp | |

Each user has exactly one morning template and one evening template.

**PracticeSession**

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| user_id | uuid | FK |
| template_id | uuid | FK |
| started_at, completed_at | timestamps | completed_at null if abandoned |
| blocks_completed | jsonb | which blocks were done vs skipped |

**JournalEntry**

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| user_id | uuid | FK |
| session_id | uuid? | FK; null if standalone |
| kind | enum | `future_self`, `rehearsal`, `reflection`, `gratitude` |
| body | text | the writing |
| identity_id | uuid? | which identity this was for |
| mood_before, mood_after | int? | placeholder for emotional layer (TBD) |
| created_at | timestamp | |

### Streak logic

Streaks are **computed**, not stored. Computation rule (Clear's "never miss twice"):

- Walk backward from today over the habit's scheduled days only.
- One miss = freeze (streak preserved but not extended).
- Two consecutive scheduled-day misses = reset.

This produces compassionate-but-honest streak counts and makes backfills/edits safe.

---

## UX architecture

### Aesthetic

A hybrid:

- **Practice screens** → calm, spa-like, lots of whitespace, soft type, gentle motion (like Calm or Oak)
- **Journal screens** → warm, paper-feeling, serif type, personal (like Day One)
- **Habit screens** → crisp, structured, satisfying (like Things 3 or Linear)

Theme tokens implemented as CSS variables so each surface can express its own mood while remaining a coherent system.

### Navigation

Three bottom tabs:

- 🏠 **Today** — time-aware home
- 🔥 **Habits** — full list, edit, chains
- 📓 **Journal** — all your writing, browsable

Profile menu (top-right of Today) for the set-and-forget surfaces:

- **Identities** — manage the spine
- **Templates** — edit morning + evening practice templates
- **Settings** — reminders, theme, account, export

### The Today screen (time-aware)

The hero of the home screen rotates throughout the day:

- **Morning, before practice** → big "Begin morning practice" CTA, with today's intention faded below.
- **Daytime, after morning practice** → today's intention (one active affirmation) at top, habits list as primary content.
- **Evening, after sundown** → big "Begin evening practice" CTA, today's habit completion status visible.
- **Late evening, after evening practice** → "Well done. See you tomorrow."

The user never has to decide what to do — the app surfaces the right thing.

### The practice flow

One block per screen, fullscreen, immersive. Tap to advance. Progress dots at top show position in the flow. A small "skip block" affordance is available but not the primary action.

This is non-negotiable: the whole point of practice is undivided attention. Scrollable multi-block pages would defeat the purpose.

### Onboarding

**The first practice IS the onboarding.** A new user taps "Begin morning practice" and is walked through writing their first identity, first affirmation, first visualization scene, first habit — but framed *as the practice itself*, not as configuration. They finish their first morning ritual having authored everything they need.

Ambitious, on-brand, harder to design and recover from interrupts. Worth the effort.

### Notifications

**Smart, with a light starting layer.**

- Default: morning + evening nudges at user-set times.
- Behavior-adaptive rules layered on later: gentle suggestions to move reminder times based on actual practice times, soft "didn't do it today" reminders consistent with Clear's "never miss twice."
- Never panic language, streak-loss alarms, or per-habit reminders.

Smart rules require longitudinal data — we build the infrastructure now but ship initially with simple light reminders. Adaptive layer turns on once we have weeks of data to be smart with.

---

## Creation flows

How identities, affirmations, habits, and scenes get into the database. Two contexts: **first-time** (woven into the first practice) and **ongoing**.

### First practice as onboarding

The user's first session walks them through writing their inner architecture as part of the practice, not as a setup wizard:

1. **Identity capture** — *"Begin with one sentence: 'I am the kind of person who…'"*
2. **Affirmation expansion** — *"Write 1–3 affirmations that support that identity. They don't all need to start with 'I am.'"*
3. **Visualization scene** — *"Picture a specific moment that proves this identity is real. Where are you? What's happening? How are you carrying yourself? What do you say or do?"* — guided prompts produce a scene.
4. **First habit** — *"What's one small daily action that votes for this identity?"* — plus which days of the week it's scheduled.
5. **The actual practice** — show the affirmations they just wrote, the scene they just authored, mental rehearsal, done.

End state of onboarding: **1 identity, 1–3 affirmations, 1 habit, 1 scene.** The minimum viable inner architecture. Enough to start.

### Ongoing creation

The **Identity detail view** is the hub for everything that hangs off one identity. Reached from `Profile menu → Identities → tap one`. Inside, it shows:

- The identity statement (editable)
- List of affirmations, each with `+ add`
- List of habits, each with `+ add`
- List of visualization scenes, each with `+ add`
- Edit / archive controls

**Affirmations and scenes** can only be created inside an Identity detail view — no orphan creation paths.

**New identities** are created from `Identities → +`.

**Habits** can be initiated from two places: the Habits tab's `+` button, or from inside an identity. Either way, picking an identity is required at creation time. If the user starts in the Habits tab and lacks a fitting identity, the identity picker offers `+ new identity` inline — no need to back out, switch tabs, and return.

### The constraint, enforced

Every habit points at exactly one identity. Every affirmation and scene hangs off an identity. The spine principle is enforced at the data layer (foreign keys, not nullable) and surfaced in the UI (no orphan creation paths). This forces the user to articulate *why* before *what* — the heart of identity-based habit work.

---

## The block library

Nine block types. Some morning-leaning, some evening-leaning, some both.

| Block | Time | What it does |
|---|---|---|
| 🌅 Centering | both | Short breath / arrive in the body. Optional opener. |
| 💬 Affirmations | both | Cycle through affirmations from active identities. |
| 🎬 Visualization | both | User-authored scene displayed for vivid mental rehearsal. |
| 🎯 Mental rehearsal | morning | Picture today's specific key moment going well. |
| ✍️ Future-self journaling | morning | Write a paragraph *as* the person you're becoming. |
| 📋 Day preview | morning | Today's scheduled habits, calmly displayed. |
| 🪞 Reflection | evening | How did today go? What showed up? |
| 🌙 Tomorrow rehearsal | evening | Mentally walk through tomorrow's key moment. |
| 🙏 Gratitude | evening | Optional, end-of-day. |

---

## Design system

The Canva designs establish a concrete visual language. The files in `canva/` are the canonical visual reference and should be treated as authoritative for the look and feel.

### Typography

- **Display font** — italic serif for headlines, intentions, identity statements, journal bodies, numeric streaks. Letter-spacing roughly `-0.025em`. This is the recurring gesture of the brand.
- **Body font** — sans-serif for buttons, body text, eyebrows, captions. Letter-spacing roughly `-0.01em`.
- **Eyebrow** — small uppercased label, `0.12em` letter-spacing, used to introduce sections (*"This morning"*, *"Today's intention"*, *"Votes today"*).

### Color tokens (CSS variables)

| Token | Use |
|---|---|
| `--text` | Primary text |
| `--text-2` | Secondary text |
| `--text-3` | Tertiary / placeholder text |
| `--bg` | Page background |
| `--bg-2` | Card / surface background |
| `--accent` | Primary accent (warmth) |
| `--accent-soft` | Diffuse / fill version of accent |
| `--hairline` | 0.5px borders, dividers |
| `--ink` | High-contrast button background |

These are theme tokens — light mode, dark mode, and identity-themed surfaces all set the same variable names to different values.

### Identity colors

Each identity has its own hex color (stored on the `Identity` entity). Used as:

- Color dot next to the identity statement wherever it appears
- Vertical accent bar on habit rows
- The identity statement itself, rendered in this color, on its detail screen
- Optional theming for affirmations and scenes belonging to that identity

### Hairlines

All borders are `0.5px solid var(--hairline)`. They only render crisply on retina/HiDPI screens — this is intentional and signals craft.

### Motion

Three core animation classes appear throughout:

- `tend-fade` — soft fade-in on element mount
- `tend-rise` — fade + small upward translate, with `animationDelay` used to stagger reveals
- `tend-breath` — slow pulse, 4–8 second cycle, used for the Centering visualizer and any "presence" element

Animations are slow (multi-second durations), not snappy. The app should feel like it breathes.

---

## Voice & copy

The Canva designs established a voice; we preserve it.

### Principles

- **Present-tense.** *"Sit with the day you lived,"* not *"Look back on your day."*
- **Italic-serif gestures.** Key phrases shift into italic display serif inside otherwise-sans surfaces — affirmations, intentions, hero phrases. This is the brand's recurring move.
- **Never gamified.** No streak-loss alarms, no shame language, no badges, no panic.
- **Friend, not casino.** Lead with calm. The numbers should help, not pressure.
- **The "votes" frame, surfaced.** *"Six small votes for who you are."* *"Five votes for who you're becoming."* Clear's vote metaphor isn't buried — it's part of how the app talks about your day.
- **Specific over abstract.** *"something the light did,"* *"someone you noticed"* — sensory and small, not motivational-poster vague.
- **Discretion in private moments.** *"Write honestly. No-one is reading this."* The app acknowledges its own role; doesn't pretend to be omniscient.

### Voice anchors

These specific lines from the Canva designs should be considered locked unless we have a strong reason to change them:

| Surface | Line |
|---|---|
| Morning hero | *"Prime the self you're becoming."* |
| Evening hero | *"Sit with the day you lived."* |
| Late state | *"Well done. Five votes for who you're becoming. Rest. See you tomorrow."* |
| Day preview | *"Six small votes for who you are."* |
| Future-self caption | *"From the perspective of done"* |
| Reflection placeholder | *"Write honestly. No-one is reading this."* |
| Tomorrow rehearsal | *"Walk through the moment that matters."* |
| Gratitude placeholders | *"something the light did" / "someone you noticed" / "something small"* |
| Centering | *"Let the body arrive before the mind starts."* |

---

## Technical stack

Philosophy: **boring tech that ships beautifully.** Each piece is mature, well-documented, and survives the path from "personal tool" → "public app" without rewriting.

**Frontend**
- Next.js (App Router) + React + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (practice flow animations)

**Client-side state**
- TanStack Query (server state, offline caching, optimistic updates)
- Zustand (local UI state, e.g. in-progress practice session)

**Backend & data**
- Supabase: Postgres + Auth + Row-Level Security + Edge Functions + Storage
- Drizzle ORM (TypeScript-first, lightweight)

**PWA**
- next-pwa + Workbox (service worker, offline shell, install prompt)
- Web Push API (notifications; iOS 16.4+ supported)

**Auth**
- Supabase Auth, magic-link email default
- Anonymous-then-upgrade flow so new users can start their first practice without an account

**Dates**
- date-fns + date-fns-tz (timezone-aware streak math and reminders)

**Deployment**
- Vercel (Next.js app, preview deployments per branch)
- Supabase Cloud (backend)

**Out of v1**
- ❌ Mobile-native (Capacitor/RN) — PWA first
- ❌ AI features — could come later
- ❌ Analytics (Sentry/PostHog) — add when there's usage to analyze
- ❌ Payments

---

## Build plan

**Phase A — Foundation.** Repo, Next.js, Tailwind, shadcn/ui, Supabase, Drizzle, Vercel, auth, PWA manifest, service worker. End: empty app you can sign into.

**Phase B — The spine.** Identities, affirmations, habits, habit logs, streak math, visualization scenes. End: model your inner architecture in the database.

**Phase C — The Today screen.** Time-aware home, three-tab nav, profile menu, inline habit check-off. End: usable as a calm habit tracker even before practice flow exists.

**Phase D — The practice flow.** Template editor, session flow, block-per-screen UI. Start with 4 core blocks (affirmations, visualization, mental rehearsal, future-self journaling), add the rest. End: **the v1 milestone — the whole core loop works.**

**Phase E — Journal.** Browse all writing, filter by kind, per-entry view. End: app starts feeling alive.

**Phase F — Polish + onboarding.** First-practice-as-onboarding flow. Scene editor. Animations, theme refinement, accessibility pass. End: ready to share with friends/family.

**Phase G — Light notifications.** Morning + evening reminders. Web Push. Service worker integration. End: app reaches out gently.

**Phase H — Smart notifications.** Only after 2–4 weeks of usage data. Adaptive rules layer.

**Phase I — Public launch prep.** Landing page, public onboarding polish, invite/share system. Optional.

---

## Principles

A few non-negotiables to hold onto as the build progresses:

1. **The app's tone is a friend, not a casino.** No streak panic. No FOMO. No badges that pretend to matter.
2. **One block, one screen, undivided attention.** The practice is the point.
3. **The user's words, not ours.** Visualization scenes, affirmations, identities — authored by the user. No content library.
4. **Identities are the spine.** Every feature must connect back to the user's stated identities, or it doesn't belong.
5. **Compassion in the math.** Never-miss-twice streaks. Frozen days, not broken ones. The numbers should help, not shame.
6. **Privacy from day 1.** Row-level security in Supabase from the first migration. Field-level encryption for journal bodies is a v2 question worth revisiting.
7. **Boring tech, beautiful product.** The stack is unremarkable so the work can go into the parts that matter.

---

## Open questions / TBD

These were deliberately deferred — the spec is honest about what isn't decided yet.

- **Emotional layer.** How (and whether) the app captures mood/feeling around practice. *Quick check-in? Sensory prompts? Nothing structured?* Decide when designing the visualization screen specifically.
- **Field-level journal encryption.** Standard DB encryption protects against most threats, but journal entries are the most sensitive content. Worth a v2 design pass.
- **Export format.** JSON is the obvious choice; might also offer Markdown export for the journal specifically.
- **AI assistance.** Could help users write their first visualization scene, propose affirmations from a goal, or summarize a month of journal entries. All v2+ ideas, intentionally not in v1.
- **Community / sharing.** When the app eventually goes public, do users share affirmations or scenes with each other? Probably no, but worth deciding deliberately.
- **Domain / brand presence.** `tend.com` and likely `tend.app` are taken. Options: `gettend.com`, `tendapp.com`, or a different TLD. Decide at deploy time.

---

## Build log

### Phase A1 — Visual shell *(May 21, 2026)*

**Landed:**

- Repo initialized at `C:/C Schorr/Tend/`, git locally, no remote yet.
- Next.js **16.2.6** (App Router, Turbopack) + React 19 + TypeScript 5,
  scaffolded with `create-next-app` (`src/` dir, `@/*` alias, pnpm).
- Tailwind CSS **4** — uses CSS-first `@theme inline { ... }` config in
  `globals.css`, **not** `tailwind.config.ts`. Notable departure from
  Tailwind 3 conventions.
- Design tokens defined verbatim per spec vocabulary in `:root`
  (`--text`, `--text-2`, `--text-3`, `--bg`, `--bg-2`, `--accent`,
  `--accent-soft`, `--hairline`, `--ink`, `--ease`) with light + dark
  mode values. Warm terracotta `--accent: #c47b4a`.
- Tailwind 4 aliases via `@theme inline` (`text-fg`, `bg-bg-2`,
  `border-hairline`, etc.) — raw `var(--*)` arbitrary syntax also works.
- Motion keyframes for `tend-fade`, `tend-rise`, `tend-breath` with
  `prefers-reduced-motion` respect.
- Utility classes inferred from canva usage: `.eyebrow`, `.serif`,
  `.italic`, `.tend-chip`, `.tend-check`, `.tend-habit`, `.tend-dots`,
  `.no-scroll-bar`.
- Fonts via `next/font/google`: **Instrument Serif** (italic display,
  400) + **Inter** (body). Placeholder — revisit in polish phase.
- Design deps: `framer-motion`, `lucide-react` (now at 1.x, not 0.x),
  `clsx`, `tailwind-merge`.
- `/preview` route renders all four Today states (morning, daytime,
  evening, late) inside mock phone frames, with inline mock data
  matching SPEC § *Data model* entities. Static, no interactivity.
- `pnpm build` passes, all routes prerender as static.

**Decisions made:**

- **Package manager:** pnpm (was open; chose for disk efficiency).
- **Font pairing:** Instrument Serif + Inter, placeholder.
- **Git remote:** local only for now, no GitHub yet.
- **Tailwind config style:** CSS-first via `@theme inline` (forced by
  Tailwind 4 default).

**Deferred to Phase A2:**

- Supabase project (cloud) + local `supabase/` CLI dir + `.env.local`.
- Drizzle schema migration #1 covering all entities from SPEC § *Data
  model*, with RLS policies in the same migration.
- `@supabase/ssr` auth helper + magic-link sign-in +
  anonymous-then-upgrade flow.
- PWA: `manifest.webmanifest`, icons, service worker. **Note:**
  `next-pwa` is unmaintained on Next 16 — verify `@serwist/next` or
  similar before committing the choice.
- Vercel project link + first preview deploy. CLI added as devDep and
  `pnpm deploy` / `pnpm deploy:prod` scripts wired; **first run
  requires interactive `vercel login` + `vercel link`** in a terminal
  the user controls.
- GitHub remote (optional — only if user wants Vercel auto-deploys on
  push instead of CLI-driven deploys).

**Known limitations to revisit:**

- `/preview` block-icon strip uses placeholder lucide picks
  (`Check`/`ChevronRight`) for non-moon blocks. Full mapping lands
  when `canva/practice.jsx` is ported in Phase D.
- Dark mode is `prefers-color-scheme`-driven only; manual toggle and
  identity-themed surfaces (per SPEC § *Design system → Identity
  colors*) deferred.

---

*This spec is a living document. Update it as decisions change. Append revision dates so future readers can see the arc.*
