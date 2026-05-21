// Drizzle schema mirroring the data model in SPEC.md.
// Not wired into the running app yet — will hook up in the Supabase migration step.
//
//   npm i drizzle-orm postgres
//   npm i -D drizzle-kit

import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
  date,
  jsonb,
  smallint,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const habitTargetType = pgEnum('habit_target_type', ['boolean', 'quantified']);
export const journalKind = pgEnum('journal_kind', [
  'future_self',
  'rehearsal',
  'reflection',
  'gratitude',
]);
export const templateTimeOfDay = pgEnum('template_time_of_day', ['morning', 'evening']);

export const identities = pgTable('identities', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  statement: text('statement').notNull(),
  why: text('why'),
  color: text('color').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const affirmations = pgTable('affirmations', {
  id: uuid('id').primaryKey().defaultRandom(),
  identityId: uuid('identity_id').notNull().references(() => identities.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const habits = pgTable('habits', {
  id: uuid('id').primaryKey().defaultRandom(),
  identityId: uuid('identity_id').notNull().references(() => identities.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  daysOfWeek: smallint('days_of_week').array().notNull(),
  targetType: habitTargetType('target_type').notNull(),
  targetValue: integer('target_value'),
  targetUnit: text('target_unit'),
  cue: text('cue'),
  craving: text('craving'),
  response: text('response'),
  reward: text('reward'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const habitLogs = pgTable('habit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  habitId: uuid('habit_id').notNull().references(() => habits.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  completed: boolean('completed').notNull(),
  value: integer('value'),
  note: text('note'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const visualizationScenes = pgTable('visualization_scenes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  identityId: uuid('identity_id').references(() => identities.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  body: text('body').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const practiceTemplates = pgTable('practice_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  timeOfDay: templateTimeOfDay('time_of_day').notNull(),
  blocks: jsonb('blocks').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const practiceSessions = pgTable('practice_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  templateId: uuid('template_id').notNull().references(() => practiceTemplates.id),
  startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  blocksCompleted: jsonb('blocks_completed'),
});

export const journalEntries = pgTable('journal_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  sessionId: uuid('session_id').references(() => practiceSessions.id, { onDelete: 'set null' }),
  kind: journalKind('kind').notNull(),
  body: text('body').notNull(),
  identityId: uuid('identity_id').references(() => identities.id, { onDelete: 'set null' }),
  moodBefore: integer('mood_before'),
  moodAfter: integer('mood_after'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
