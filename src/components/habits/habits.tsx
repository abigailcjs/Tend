'use client';

import { useRouter } from 'next/navigation';
import { useTend } from '@/lib/store';
import { TEND_HABITS, TEND_IDENTITIES } from '@/lib/demo-data';
import type { Habit } from '@/lib/types';
import { IconCheck, IconChevR, IconPlus } from '@/components/icons';

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function TendHabits() {
  const habitDone = useTend((s) => s.habitDone);
  const toggleHabit = useTend((s) => s.toggleHabit);
  const router = useRouter();

  const grouped = TEND_IDENTITIES.map((id) => ({
    identity: id,
    habits: TEND_HABITS.filter((h) => h.identityId === id.id),
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        paddingTop: 56,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0 22px 18px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>
            This week
          </div>
          <div
            className="serif"
            style={{
              fontSize: 38,
              color: 'var(--text)',
              letterSpacing: '-0.025em',
              lineHeight: 1,
              fontStyle: 'italic',
            }}
          >
            Habits
          </div>
        </div>
        <button
          type="button"
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: '0.5px solid var(--hairline)',
            background: 'var(--bg-2)',
            color: 'var(--text-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <IconPlus size={18} />
        </button>
      </div>

      <div
        className="no-scroll-bar"
        style={{ flex: 1, overflowY: 'auto', paddingBottom: 110 }}
      >
        <WeekStrip habits={TEND_HABITS} habitDone={habitDone} />

        {grouped.map(({ identity, habits }, gi) => (
          <div key={identity.id} style={{ marginTop: gi === 0 ? 28 : 24 }}>
            <button
              type="button"
              onClick={() => router.push(`/identity/${identity.id}`)}
              style={{
                background: 'transparent',
                border: 0,
                cursor: 'pointer',
                padding: '0 22px 10px',
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: identity.color,
                  flexShrink: 0,
                }}
              />
              <span
                className="serif"
                style={{
                  fontSize: 16,
                  color: 'var(--text-2)',
                  letterSpacing: '-0.005em',
                  fontStyle: 'italic',
                }}
              >
                {identity.statement}
              </span>
              <IconChevR
                size={14}
                style={{ color: 'var(--text-3)', marginLeft: 'auto' }}
              />
            </button>
            <div
              style={{
                margin: '0 16px',
                background: 'var(--bg-2)',
                borderRadius: 22,
                border: '0.5px solid var(--hairline)',
                overflow: 'hidden',
              }}
            >
              {habits.map((h) => (
                <HabitDetailRow
                  key={h.id}
                  habit={h}
                  done={!!habitDone[h.id]}
                  onToggle={() => toggleHabit(h.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HabitDetailRow({
  habit,
  done,
  onToggle,
}: {
  habit: Habit;
  done: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        borderTop: '0.5px solid var(--hairline)',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{ background: 'transparent', border: 0, padding: 0, cursor: 'pointer' }}
      >
        <div
          className="tend-check"
          style={{
            background: done ? 'var(--accent)' : 'transparent',
            borderColor: done ? 'var(--accent)' : 'var(--text-3)',
            color: done ? 'var(--bg)' : 'transparent',
          }}
        >
          {done && <IconCheck size={14} />}
        </div>
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          {habit.name}
          {habit.targetType === 'quantified' && (
            <span style={{ color: 'var(--text-3)', marginLeft: 6, fontSize: 13 }}>
              · {habit.target} {habit.unit}
            </span>
          )}
        </div>
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
          {DAY_LETTERS.map((l, i) => {
            const scheduled = habit.days.includes(i as 0 | 1 | 2 | 3 | 4 | 5 | 6);
            return (
              <div
                key={i}
                style={{
                  width: 13,
                  height: 13,
                  fontSize: 8.5,
                  fontWeight: 500,
                  color: scheduled ? 'var(--text-2)' : 'var(--text-3)',
                  opacity: scheduled ? 1 : 0.4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {l}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 22,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {habit.streak}
        </div>
        <div
          style={{
            fontSize: 9,
            color: 'var(--text-3)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: 2,
          }}
        >
          day streak
        </div>
      </div>
    </div>
  );
}

function WeekStrip({
  habits,
  habitDone,
}: {
  habits: Habit[];
  habitDone: Record<string, boolean>;
}) {
  const pattern = (habit: Habit, dayBack: number) => {
    if (dayBack === 0) return !!habitDone[habit.id];
    const seed = parseInt(habit.id.slice(1), 10) * 13 + dayBack;
    return seed % 5 !== 0;
  };
  return (
    <div
      style={{
        margin: '0 16px',
        padding: '18px 18px 16px',
        background: 'var(--bg-2)',
        borderRadius: 22,
        border: '0.5px solid var(--hairline)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 14, color: 'var(--text)' }}>
          <span
            className="serif"
            style={{ fontSize: 17, fontStyle: 'italic' }}
          >
            The last seven days
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {habits.slice(0, 4).map((h) => {
          const id = TEND_IDENTITIES.find((i) => i.id === h.identityId)!;
          return (
            <div
              key={h.id}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-2)',
                  flex: 1,
                  minWidth: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {h.name}
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[6, 5, 4, 3, 2, 1, 0].map((d) => {
                  const filled = pattern(h, d);
                  const scheduled = h.days.includes(
                    ((4 - d + 7) % 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6,
                  );
                  return (
                    <div
                      key={d}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 4,
                        background: scheduled
                          ? filled
                            ? id.color
                            : 'transparent'
                          : 'transparent',
                        border:
                          '0.5px solid ' +
                          (scheduled
                            ? filled
                              ? id.color
                              : 'var(--text-3)'
                            : 'transparent'),
                        opacity: scheduled ? (filled ? 1 : 0.6) : 0.2,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
