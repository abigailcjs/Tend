-- Tend — initial schema with row-level security.
-- Apply with `supabase db push` or include via Supabase migrations.
-- See db/schema.ts for the Drizzle equivalent.

create extension if not exists "uuid-ossp";

create type habit_target_type as enum ('boolean', 'quantified');
create type journal_kind as enum ('future_self', 'rehearsal', 'reflection', 'gratitude');
create type template_time_of_day as enum ('morning', 'evening');

create table identities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  statement text not null,
  why text,
  color text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table affirmations (
  id uuid primary key default uuid_generate_v4(),
  identity_id uuid not null references identities(id) on delete cascade,
  text text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table habits (
  id uuid primary key default uuid_generate_v4(),
  identity_id uuid not null references identities(id) on delete cascade,
  name text not null,
  days_of_week smallint[] not null,
  target_type habit_target_type not null,
  target_value integer,
  target_unit text,
  cue text,
  craving text,
  response text,
  reward text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table habit_logs (
  id uuid primary key default uuid_generate_v4(),
  habit_id uuid not null references habits(id) on delete cascade,
  date date not null,
  completed boolean not null,
  value integer,
  note text,
  created_at timestamptz not null default now(),
  unique (habit_id, date)
);

create table visualization_scenes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  identity_id uuid references identities(id) on delete set null,
  title text not null,
  body text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table practice_templates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  time_of_day template_time_of_day not null,
  blocks jsonb not null,
  updated_at timestamptz not null default now(),
  unique (user_id, time_of_day)
);

create table practice_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid not null references practice_templates(id),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  blocks_completed jsonb
);

create table journal_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references practice_sessions(id) on delete set null,
  kind journal_kind not null,
  body text not null,
  identity_id uuid references identities(id) on delete set null,
  mood_before integer,
  mood_after integer,
  created_at timestamptz not null default now()
);

-- ===== Row-Level Security =====
alter table identities enable row level security;
alter table affirmations enable row level security;
alter table habits enable row level security;
alter table habit_logs enable row level security;
alter table visualization_scenes enable row level security;
alter table practice_templates enable row level security;
alter table practice_sessions enable row level security;
alter table journal_entries enable row level security;

-- Policy template: owner-only access.
create policy "identities self" on identities
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "affirmations self" on affirmations
  for all using (exists (select 1 from identities i where i.id = identity_id and i.user_id = auth.uid()))
  with check (exists (select 1 from identities i where i.id = identity_id and i.user_id = auth.uid()));

create policy "habits self" on habits
  for all using (exists (select 1 from identities i where i.id = identity_id and i.user_id = auth.uid()))
  with check (exists (select 1 from identities i where i.id = identity_id and i.user_id = auth.uid()));

create policy "habit_logs self" on habit_logs
  for all using (exists (select 1 from habits h join identities i on i.id = h.identity_id where h.id = habit_id and i.user_id = auth.uid()))
  with check (exists (select 1 from habits h join identities i on i.id = h.identity_id where h.id = habit_id and i.user_id = auth.uid()));

create policy "scenes self" on visualization_scenes
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "templates self" on practice_templates
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "sessions self" on practice_sessions
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "journal self" on journal_entries
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
