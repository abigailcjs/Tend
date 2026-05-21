// Seed data — the demo inner architecture used until Supabase is wired in.
// Mirrors the prototype's demo-data.jsx so the visual port is faithful.

import type { Block, BlockId, Habit, Identity, JournalEntry } from './types';

export const TEND_IDENTITIES: Identity[] = [
  {
    id: 'i1',
    statement: 'I create without permission',
    why: 'Because waiting to be picked is a slow death.',
    color: '#c4a878',
    affirmations: [
      { id: 'a1', text: 'I make things and put them out.', active: true },
      { id: 'a2', text: 'My work doesn’t need approval to exist.', active: true },
      { id: 'a3', text: 'Done is a gift to future me.', active: true },
      { id: 'a4', text: 'The way out is through making.', active: false },
    ],
    scenes: [
      {
        id: 's1',
        title: 'Friday, 4:30pm',
        body: 'It’s late Friday afternoon. The small thing I started on Monday is live. I close the laptop without checking anything. My shoulders are down. I notice I’m smiling a little. There’s a quiet feeling — not pride exactly, more like recognition. I am the person who finishes.',
        active: true,
      },
    ],
  },
  {
    id: 'i2',
    statement: 'I move first thing in the morning',
    why: 'My body is the house I live in.',
    color: '#9aaa7e',
    affirmations: [
      { id: 'a5', text: 'My body is my home; I tend it.', active: true },
      { id: 'a6', text: 'Movement is the price of a clear mind.', active: true },
    ],
    scenes: [
      {
        id: 's2',
        title: 'The first ten minutes',
        body: 'I open my eyes and feet hit floor before story starts. The air is cold against my arms. I am moving before my mind has finished waking up. By the time I think about it, it’s already happening.',
        active: true,
      },
    ],
  },
  {
    id: 'i3',
    statement: 'I am present with the people I love',
    why: 'Attention is the most generous thing I own.',
    color: '#a86a4e',
    affirmations: [
      { id: 'a7', text: 'Presence is the gift.', active: true },
      { id: 'a8', text: 'I listen longer than feels natural.', active: true },
    ],
    scenes: [],
  },
];

export const TEND_HABITS: Habit[] = [
  { id: 'h1', identityId: 'i1', name: 'Ship something small', days: [1, 2, 3, 4, 5], targetType: 'boolean', cue: 'After coffee', streak: 14 },
  { id: 'h2', identityId: 'i1', name: 'Read', days: [0, 1, 2, 3, 4, 5, 6], targetType: 'quantified', target: 20, unit: 'pages', cue: 'Before bed', streak: 32 },
  { id: 'h3', identityId: 'i2', name: 'Morning walk', days: [0, 1, 2, 3, 4, 5, 6], targetType: 'quantified', target: 20, unit: 'min', cue: 'After waking', streak: 8 },
  { id: 'h4', identityId: 'i2', name: 'Lift', days: [1, 3, 5], targetType: 'boolean', cue: '7am', streak: 5 },
  { id: 'h5', identityId: 'i3', name: 'No-phone dinner', days: [0, 1, 2, 3, 4, 5, 6], targetType: 'boolean', cue: '6:30pm', streak: 21 },
  { id: 'h6', identityId: 'i3', name: 'Send one note', days: [1, 3, 5], targetType: 'boolean', cue: '', streak: 3 },
];

export const TEND_JOURNAL: JournalEntry[] = [
  { id: 'j1', kind: 'future_self', identityId: 'i1', date: 'May 20', body: 'Today I sat down and wrote without checking anything. The thing wasn’t good when I started, but I kept going. By the end I had something real. I am the person who finishes.' },
  { id: 'j2', kind: 'reflection', identityId: null, date: 'May 19', body: 'Hard day. Skipped the morning practice. The whole day felt like I was catching up. Tomorrow I begin again.' },
  { id: 'j3', kind: 'gratitude', identityId: null, date: 'May 19', body: '1. Light through the kitchen window.\n2. The pause before M. answered the phone.\n3. Soup at the right temperature.' },
  { id: 'j4', kind: 'rehearsal', identityId: 'i2', date: 'May 19', body: 'Tomorrow: alarm, feet down, no scroll. Walk before the thinking starts. The cold against my arms.' },
  { id: 'j5', kind: 'future_self', identityId: 'i3', date: 'May 18', body: 'I put the phone in the drawer before dinner. I asked the second question. I noticed her shoulders relax.' },
];

export const TEND_TODAY_DONE: Record<string, boolean> = {
  h2: true, h3: true, h5: false, h1: false, h4: false, h6: false,
};

export const TEND_BLOCKS: Block[] = [
  { id: 'centering',    icon: 'breath', title: 'Centering',           sub: 'Arrive in the body',           morning: true,  evening: true,  duration: '1 min' },
  { id: 'affirmations', icon: 'speech', title: 'Affirmations',        sub: 'The words you’re installing', morning: true,  evening: true,  duration: '2 min' },
  { id: 'visualization',icon: 'eye',    title: 'Visualization',       sub: 'Your authored scene',          morning: true,  evening: true,  duration: '3 min' },
  { id: 'rehearsal',    icon: 'target', title: 'Mental rehearsal',    sub: 'Today’s key moment',          morning: true,  evening: false, duration: '2 min' },
  { id: 'future_self',  icon: 'pen',    title: 'Future-self writing', sub: 'Write as the person',          morning: true,  evening: false, duration: '4 min' },
  { id: 'preview',      icon: 'list',   title: 'Day preview',         sub: 'What’s on the day',           morning: true,  evening: false, duration: '1 min' },
  { id: 'reflection',   icon: 'mirror', title: 'Reflection',          sub: 'How did today land?',          morning: false, evening: true,  duration: '3 min' },
  { id: 'tomorrow',     icon: 'moon',   title: 'Tomorrow rehearsal',  sub: 'Walk through tomorrow',        morning: false, evening: true,  duration: '2 min' },
  { id: 'gratitude',    icon: 'flame',  title: 'Gratitude',           sub: 'Three small things',           morning: false, evening: true,  duration: '2 min' },
];

export const MORNING_TEMPLATE: BlockId[] = ['centering', 'affirmations', 'visualization', 'rehearsal', 'future_self', 'preview'];
export const EVENING_TEMPLATE: BlockId[] = ['centering', 'reflection', 'tomorrow', 'gratitude'];
