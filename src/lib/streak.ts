// Streak math — Clear's "never miss twice" rule.
//
// Streaks are not stored. Walk backwards over scheduled days only:
//   - one consecutive miss = freeze (preserves streak, doesn't extend it)
//   - two consecutive scheduled-day misses = reset
//
// Returns the number of consecutive non-frozen completed days walking back
// from `today`, inclusive of today if completed.

import type { DayIndex } from './types';

export interface HabitLogish {
  date: string; // YYYY-MM-DD
  completed: boolean;
}

export function computeStreak(
  scheduledDays: DayIndex[],
  logs: HabitLogish[],
  today: Date = new Date(),
): number {
  const byDate = new Map(logs.map((l) => [l.date, l.completed]));
  const isScheduled = (d: Date) => scheduledDays.includes(d.getDay() as DayIndex);

  let streak = 0;
  let consecutiveMisses = 0;

  for (let i = 0; i < 365; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    if (!isScheduled(day)) continue;

    const key = day.toISOString().slice(0, 10);
    const completed = byDate.get(key) === true;

    if (completed) {
      streak += 1;
      consecutiveMisses = 0;
    } else {
      consecutiveMisses += 1;
      if (consecutiveMisses >= 2) break;
      // single miss = freeze, keep walking.
    }
  }

  return streak;
}
