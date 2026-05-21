// Tend domain types — see SPEC.md "Data model"

export type IdentityId = string;
export type AffirmationId = string;
export type HabitId = string;
export type SceneId = string;
export type JournalId = string;

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

export interface Affirmation {
  id: AffirmationId;
  text: string;
  active: boolean;
}

export interface Scene {
  id: SceneId;
  title: string;
  body: string;
  active: boolean;
}

export interface Identity {
  id: IdentityId;
  statement: string;
  why?: string;
  color: string;
  affirmations: Affirmation[];
  scenes: Scene[];
}

export type HabitTargetType = 'boolean' | 'quantified';

export interface Habit {
  id: HabitId;
  identityId: IdentityId;
  name: string;
  days: DayIndex[];
  targetType: HabitTargetType;
  target?: number;
  unit?: string;
  cue?: string;
  streak: number;
}

export type JournalKind = 'future_self' | 'rehearsal' | 'reflection' | 'gratitude';

export interface JournalEntry {
  id: JournalId;
  kind: JournalKind;
  identityId: IdentityId | null;
  date: string;
  body: string;
}

export type BlockId =
  | 'centering'
  | 'affirmations'
  | 'visualization'
  | 'rehearsal'
  | 'future_self'
  | 'preview'
  | 'reflection'
  | 'tomorrow'
  | 'gratitude';

export type BlockIcon =
  | 'breath'
  | 'speech'
  | 'eye'
  | 'target'
  | 'pen'
  | 'list'
  | 'mirror'
  | 'moon'
  | 'flame';

export interface Block {
  id: BlockId;
  icon: BlockIcon;
  title: string;
  sub: string;
  morning: boolean;
  evening: boolean;
  duration: string;
}

export type Aesthetic = 'grove' | 'paper' | 'minimal';
export type TodayState = 'morning' | 'daytime' | 'evening' | 'late';
export type PracticeKind = 'morning' | 'evening';
