// Data source abstraction.
//
// Today: returns the in-memory demo data so the app runs with zero config.
// Tomorrow: when Supabase env vars are set, this module will switch to live
// queries against the schema in supabase/migrations/0001_initial.sql.
//
// The intent is that every screen imports from here, not from `demo-data` directly.
// Right now the screens still import demo-data — flip them over when the Supabase
// client is wired (Phase B). The shape stays the same.

import { TEND_HABITS, TEND_IDENTITIES, TEND_JOURNAL } from './demo-data';
import type { Habit, Identity, JournalEntry } from './types';

const useSupabase =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getIdentities(): Promise<Identity[]> {
  if (useSupabase) {
    throw new Error('Supabase data source not wired yet — see lib/data-source.ts');
  }
  return TEND_IDENTITIES;
}

export async function getHabits(): Promise<Habit[]> {
  if (useSupabase) {
    throw new Error('Supabase data source not wired yet — see lib/data-source.ts');
  }
  return TEND_HABITS;
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  if (useSupabase) {
    throw new Error('Supabase data source not wired yet — see lib/data-source.ts');
  }
  return TEND_JOURNAL;
}

export const isUsingSupabase = !!useSupabase;
