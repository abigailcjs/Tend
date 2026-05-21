'use client';

import { useRouter } from 'next/navigation';
import { useTend } from '@/lib/store';
import { MORNING_TEMPLATE, TEND_BLOCKS, TEND_HABITS, TEND_IDENTITIES } from '@/lib/demo-data';
import type { Habit, Identity, PracticeKind } from '@/lib/types';
import { BLOCK_ICON, IconCheck, IconChevR, IconMoon, IconUser } from '@/components/icons';
import { Fragment } from 'react';

export function TendToday() {
  const todayState = useTend((s) => s.todayState);
  const habitDone = useTend((s) => s.habitDone);
  const toggleHabit = useTend((s) => s.toggleHabit);
  const setProfileOpen = useTend((s) => s.setProfileOpen);
  const beginPractice = useTend((s) => s.beginPractice);
  const router = useRouter();

  // Filter to Thursday May 21 (matches the prototype's spec date)
  const todays = TEND_HABITS.filter((h) => h.days.includes(4));
  const identity = TEND_IDENTITIES[0];
  const activeAff = identity.affirmations.find((a) => a.active)!;
  const doneCount = todays.filter((h) => habitDone[h.id]).length;

  const onOpenIdentity = (id: string) => {
    router.push(`/identity/${id}`);
  };
  const onBegin = (kind: PracticeKind) => beginPractice(kind);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 56,
      }}
    >
      <TodayHeader onOpenProfile={() => setProfileOpen(true)} />

      <div
        className="no-scroll-bar"
        style={{ flex: 1, overflowY: 'auto', paddingBottom: 110 }}
      >
        {todayState === 'morning' && (
          <TodayMorning
            identity={identity}
            affirmation={activeAff.text}
            onBegin={() => onBegin('morning')}
          />
        )}
        {todayState === 'daytime' && (
          <TodayDaytime
            affirmation={activeAff.text}
            habits={todays}
            habitDone={habitDone}
            onToggleHabit={toggleHabit}
            onOpenIdentity={onOpenIdentity}
          />
        )}
        {todayState === 'evening' && (
          <TodayEvening
            doneCount={doneCount}
            total={todays.length}
            habits={todays}
            habitDone={habitDone}
            onBegin={() => onBegin('evening')}
          />
        )}
        {todayState === 'late' && <TodayLate />}
      </div>
    </div>
  );
}

function TodayHeader({ onOpenProfile }: { onOpenProfile: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px 0 22px',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 24,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          tend
        </div>
        <div className="eyebrow" style={{ marginTop: 6, letterSpacing: '0.12em' }}>
          Thursday, May 21
        </div>
      </div>
      <button
        type="button"
        onClick={onOpenProfile}
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          border: '0.5px solid var(--hairline)',
          background: 'var(--bg-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-2)',
          cursor: 'pointer',
        }}
      >
        <IconUser size={18} />
      </button>
    </div>
  );
}

function TodayMorning({
  identity,
  affirmation,
  onBegin,
}: {
  identity: Identity;
  affirmation: string;
  onBegin: () => void;
}) {
  return (
    <div style={{ padding: '40px 24px 0', display: 'flex', flexDirection: 'column' }}>
      <div className="eyebrow tend-fade" style={{ marginBottom: 14 }}>
        This morning
      </div>
      <div
        className="tend-rise"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 44,
          lineHeight: 1.05,
          color: 'var(--text)',
          letterSpacing: '-0.025em',
          marginBottom: 28,
        }}
      >
        Prime the<br />
        <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>self you’re</span>
        <br />
        <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>becoming.</span>
      </div>

      <button
        type="button"
        onClick={onBegin}
        className="tend-rise"
        style={{
          background: 'var(--ink)',
          color: 'var(--bg)',
          border: 0,
          borderRadius: 999,
          padding: '17px 24px',
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animationDelay: '0.2s',
        }}
      >
        <span>Begin morning practice</span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: 0.55,
            fontSize: 13,
          }}
        >
          12 min
          <IconChevR size={16} />
        </span>
      </button>

      <div
        className="tend-rise"
        style={{ marginTop: 36, padding: '0 4px', animationDelay: '0.45s' }}
      >
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          Today’s intention
        </div>
        <div
          className="serif"
          style={{
            fontSize: 22,
            lineHeight: 1.3,
            color: 'var(--text-2)',
            fontStyle: 'italic',
          }}
        >
          “{affirmation}”
        </div>
        <div className="tend-chip" style={{ marginTop: 14 }}>
          <span className="dot" style={{ background: identity.color }} />
          <span>{identity.statement}</span>
        </div>
      </div>

      <div
        className="tend-rise"
        style={{ marginTop: 'auto', paddingTop: 56, animationDelay: '0.7s' }}
      >
        <BlockPreview />
      </div>
    </div>
  );
}

function BlockPreview() {
  return (
    <div
      className="no-scroll-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        color: 'var(--text-3)',
        overflowX: 'auto',
        paddingBottom: 4,
      }}
    >
      {MORNING_TEMPLATE.map((id, i) => {
        const b = TEND_BLOCKS.find((x) => x.id === id)!;
        const I = BLOCK_ICON[b.icon];
        return (
          <Fragment key={id}>
            {i > 0 && (
              <div
                style={{
                  width: 14,
                  height: 0.5,
                  background: 'var(--hairline)',
                  flexShrink: 0,
                }}
              />
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                flexShrink: 0,
                width: 38,
              }}
            >
              <I size={18} />
              <div style={{ fontSize: 9, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {b.title.split(' ')[0]}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

function TodayDaytime({
  affirmation,
  habits,
  habitDone,
  onToggleHabit,
  onOpenIdentity,
}: {
  affirmation: string;
  habits: Habit[];
  habitDone: Record<string, boolean>;
  onToggleHabit: (id: string) => void;
  onOpenIdentity: (id: string) => void;
}) {
  const doneCount = habits.filter((h) => habitDone[h.id]).length;
  return (
    <div>
      <div className="tend-fade" style={{ padding: '30px 24px 28px' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Today you said
        </div>
        <div
          className="serif"
          style={{
            fontSize: 28,
            lineHeight: 1.2,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            fontStyle: 'italic',
          }}
        >
          “{affirmation}”
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          padding: '0 24px 14px',
        }}
      >
        <div className="eyebrow">Votes today</div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 18,
            color: 'var(--text-2)',
          }}
        >
          {doneCount}
          <span style={{ color: 'var(--text-3)' }}> / {habits.length}</span>
        </div>
      </div>

      <div
        style={{
          margin: '0 16px',
          background: 'var(--bg-2)',
          borderRadius: 22,
          overflow: 'hidden',
          border: '0.5px solid var(--hairline)',
        }}
      >
        {habits.map((h) => (
          <HabitRow
            key={h.id}
            habit={h}
            done={!!habitDone[h.id]}
            onToggle={() => onToggleHabit(h.id)}
            onOpenIdentity={() => onOpenIdentity(h.identityId)}
          />
        ))}
      </div>

      <div className="eyebrow" style={{ padding: '36px 24px 10px' }}>
        Tonight
      </div>
      <div
        style={{
          margin: '0 16px',
          padding: '18px 20px',
          background: 'var(--bg-2)',
          borderRadius: 22,
          border: '0.5px solid var(--hairline)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            className="serif"
            style={{ fontSize: 18, color: 'var(--text)', fontStyle: 'italic' }}
          >
            Evening practice
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>
            Reflect · Rehearse tomorrow · Gratitude
          </div>
        </div>
        <div style={{ color: 'var(--text-3)' }}>
          <IconChevR size={18} />
        </div>
      </div>
    </div>
  );
}

function HabitRow({
  habit,
  done,
  onToggle,
  onOpenIdentity,
}: {
  habit: Habit;
  done: boolean;
  onToggle: () => void;
  onOpenIdentity: () => void;
}) {
  const identity = TEND_IDENTITIES.find((i) => i.id === habit.identityId)!;
  return (
    <div className="tend-habit" onClick={onToggle}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        style={{ border: 0, padding: 0, background: 'transparent', cursor: 'pointer' }}
      >
        <div
          className="tend-check"
          data-done={done ? '1' : '0'}
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
        <div
          style={{
            fontSize: 16,
            color: 'var(--text)',
            textDecoration: done ? 'line-through' : 'none',
            textDecorationColor: 'var(--text-3)',
            opacity: done ? 0.6 : 1,
            letterSpacing: '-0.01em',
          }}
        >
          {habit.name}
          {habit.targetType === 'quantified' && (
            <span style={{ color: 'var(--text-3)', marginLeft: 6, fontSize: 13 }}>
              · {habit.target} {habit.unit}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenIdentity();
          }}
          style={{
            background: 'transparent',
            border: 0,
            padding: '4px 0 0',
            cursor: 'pointer',
          }}
        >
          <div className="tend-chip">
            <span className="dot" style={{ background: identity.color }} />
            <span>{identity.statement}</span>
          </div>
        </button>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 16,
          color: 'var(--text-3)',
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          day
        </span>
        <span style={{ color: 'var(--text-2)' }}>{habit.streak}</span>
      </div>
    </div>
  );
}

function TodayEvening({
  doneCount,
  total,
  habits,
  habitDone,
  onBegin,
}: {
  doneCount: number;
  total: number;
  habits: Habit[];
  habitDone: Record<string, boolean>;
  onBegin: () => void;
}) {
  return (
    <div style={{ padding: '32px 24px 0' }}>
      <div className="eyebrow tend-fade" style={{ marginBottom: 14 }}>
        This evening
      </div>
      <div
        className="tend-rise"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 40,
          lineHeight: 1.05,
          color: 'var(--text)',
          letterSpacing: '-0.025em',
          marginBottom: 26,
        }}
      >
        Sit with the<br />
        <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>day you</span>{' '}
        <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>lived.</span>
      </div>

      <button
        type="button"
        onClick={onBegin}
        className="tend-rise"
        style={{
          background: 'var(--ink)',
          color: 'var(--bg)',
          border: 0,
          borderRadius: 999,
          padding: '17px 24px',
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animationDelay: '0.2s',
        }}
      >
        <span>Begin evening practice</span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: 0.55,
            fontSize: 13,
          }}
        >
          8 min
          <IconChevR size={16} />
        </span>
      </button>

      <div className="tend-rise" style={{ marginTop: 36, animationDelay: '0.45s' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          Today’s votes
        </div>
        <div
          style={{
            background: 'var(--bg-2)',
            borderRadius: 22,
            border: '0.5px solid var(--hairline)',
            padding: '20px 22px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 48,
                lineHeight: 1,
                color: 'var(--text)',
                letterSpacing: '-0.03em',
              }}
            >
              {doneCount}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 20,
                color: 'var(--text-3)',
              }}
            >
              of {total}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {habits.map((h) => {
              const id = TEND_IDENTITIES.find((i) => i.id === h.identityId)!;
              return (
                <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: habitDone[h.id] ? id.color : 'transparent',
                      border: '1px solid ' + (habitDone[h.id] ? id.color : 'var(--text-3)'),
                    }}
                  />
                  <span
                    style={{
                      fontSize: 14,
                      color: habitDone[h.id] ? 'var(--text-2)' : 'var(--text-3)',
                    }}
                  >
                    {h.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function TodayLate() {
  return (
    <div
      style={{
        padding: '60px 28px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div className="tend-breath" style={{ marginBottom: 32, color: 'var(--accent)' }}>
        <IconMoon size={56} stroke={1.1} />
      </div>
      <div
        className="tend-rise serif"
        style={{
          fontSize: 38,
          lineHeight: 1.15,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          marginBottom: 16,
          fontStyle: 'italic',
        }}
      >
        Well done.
      </div>
      <div
        className="tend-rise"
        style={{
          fontSize: 16,
          color: 'var(--text-2)',
          lineHeight: 1.55,
          maxWidth: 280,
          animationDelay: '0.2s',
        }}
      >
        Five votes for who you’re becoming.
        <br />
        Rest. See you tomorrow.
      </div>

      <div
        className="tend-rise"
        style={{
          marginTop: 48,
          padding: '14px 20px',
          background: 'var(--bg-2)',
          borderRadius: 18,
          border: '0.5px solid var(--hairline)',
          fontSize: 13,
          color: 'var(--text-2)',
          animationDelay: '0.4s',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
          }}
        />
        <span>Morning practice · 7:00 am</span>
      </div>
    </div>
  );
}
