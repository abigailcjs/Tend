'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TEND_TODAY_DONE } from './demo-data';
import type { Aesthetic, BlockId, HabitId, IdentityId, PracticeKind, TodayState } from './types';

interface TendState {
  // Theming
  aesthetic: Aesthetic;
  dark: boolean;
  accent: string;
  bodySerif: boolean;

  // Time-of-day demo override
  todayState: TodayState;

  // Per-day habit completion (in v1 this lives in HabitLog)
  habitDone: Record<HabitId, boolean>;
  toggleHabit: (id: HabitId) => void;

  // UI
  profileOpen: boolean;
  setProfileOpen: (v: boolean) => void;

  identityFocus: IdentityId | null;
  setIdentityFocus: (id: IdentityId | null) => void;

  practice: { kind: PracticeKind } | null;
  beginPractice: (kind: PracticeKind) => void;
  endPractice: () => void;

  // Aesthetic actions
  setAesthetic: (a: Aesthetic) => void;
  setDark: (v: boolean) => void;
  setAccent: (c: string) => void;
  setBodySerif: (v: boolean) => void;
  setTodayState: (s: TodayState) => void;
}

const DEFAULTS = {
  aesthetic: 'grove' as Aesthetic,
  dark: true,
  accent: '#c4a878',
  bodySerif: false,
  todayState: 'daytime' as TodayState,
};

export const useTend = create<TendState>()(
  persist(
    (set) => ({
      ...DEFAULTS,

      habitDone: { ...TEND_TODAY_DONE },
      toggleHabit: (id) =>
        set((s) => ({ habitDone: { ...s.habitDone, [id]: !s.habitDone[id] } })),

      profileOpen: false,
      setProfileOpen: (v) => set({ profileOpen: v }),

      identityFocus: null,
      setIdentityFocus: (id) => set({ identityFocus: id }),

      practice: null,
      beginPractice: (kind) => set({ practice: { kind } }),
      endPractice: () => set({ practice: null }),

      setAesthetic: (a) => {
        if (a === 'grove') set({ aesthetic: a, dark: true, accent: '#c4a878' });
        else if (a === 'paper') set({ aesthetic: a, dark: false, accent: '#a86a4e' });
        else set({ aesthetic: a, dark: false, accent: '#4a5a3a' });
      },
      setDark: (v) => set({ dark: v }),
      setAccent: (c) => set({ accent: c }),
      setBodySerif: (v) => set({ bodySerif: v }),
      setTodayState: (s) => set({ todayState: s }),
    }),
    {
      name: 'tend-state-v1',
      partialize: (s) => ({
        aesthetic: s.aesthetic,
        dark: s.dark,
        accent: s.accent,
        bodySerif: s.bodySerif,
        todayState: s.todayState,
        habitDone: s.habitDone,
      }),
    },
  ),
);
