'use client';

import { useRouter } from 'next/navigation';
import { TEND_HABITS, TEND_IDENTITIES } from '@/lib/demo-data';
import type { ReactNode } from 'react';
import { IconChevL, IconMore, IconPlus } from '@/components/icons';

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function TendIdentityDetail({ identityId }: { identityId: string }) {
  const router = useRouter();
  const identity = TEND_IDENTITIES.find((i) => i.id === identityId);
  if (!identity) return null;
  const habits = TEND_HABITS.filter((h) => h.identityId === identityId);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--bg-grad, var(--bg))',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 30,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          zIndex: 10,
        }}
      >
        <button
          type="button"
          onClick={() => router.push('/identities')}
          style={{
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: 'var(--text-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: 8,
            fontFamily: 'var(--font-body)',
            fontSize: 14,
          }}
        >
          <IconChevL size={18} />
          <span>Identities</span>
        </button>
        <button
          type="button"
          style={{
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: 'var(--text-2)',
            padding: 8,
          }}
        >
          <IconMore size={20} />
        </button>
      </div>

      <div
        className="no-scroll-bar"
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: 110,
          paddingBottom: 60,
        }}
      >
        <div style={{ padding: '0 26px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: identity.color,
              }}
            />
            <div className="eyebrow">Identity</div>
          </div>
          <div
            className="tend-rise serif"
            style={{
              fontSize: 36,
              lineHeight: 1.1,
              color: 'var(--text)',
              letterSpacing: '-0.025em',
            }}
          >
            <span style={{ color: 'var(--text-3)' }}>I am</span>
            <br />
            <span style={{ color: identity.color, fontStyle: 'italic' }}>
              {identity.statement.replace(/^I( am)?\s*/, '')}
            </span>
            <span style={{ color: 'var(--text-3)' }}>.</span>
          </div>
          {identity.why && (
            <div
              className="tend-rise"
              style={{
                marginTop: 18,
                fontSize: 14,
                color: 'var(--text-2)',
                lineHeight: 1.45,
                animationDelay: '0.15s',
              }}
            >
              {identity.why}
            </div>
          )}
        </div>

        <div
          style={{
            margin: '0 26px 28px',
            display: 'flex',
            gap: 18,
            paddingTop: 18,
            borderTop: '0.5px solid var(--hairline)',
          }}
        >
          <Stat label="Affirmations" value={identity.affirmations.filter((a) => a.active).length} />
          <Stat label="Habits" value={habits.length} />
          <Stat label="Scenes" value={identity.scenes.length} />
          <Stat
            label="Best streak"
            value={habits.length ? Math.max(...habits.map((h) => h.streak)) : 0}
          />
        </div>

        <Section title="Affirmations" caption="The words you’re installing" onAdd={() => {}}>
          <div
            style={{
              margin: '0 16px',
              background: 'var(--bg-2)',
              border: '0.5px solid var(--hairline)',
              borderRadius: 22,
              overflow: 'hidden',
            }}
          >
            {identity.affirmations.map((a, i) => (
              <div
                key={a.id}
                style={{
                  padding: '14px 20px',
                  borderTop: i > 0 ? '0.5px solid var(--hairline)' : 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: a.active ? identity.color : 'var(--text-3)',
                    marginTop: 9,
                    flexShrink: 0,
                    opacity: a.active ? 1 : 0.5,
                  }}
                />
                <div
                  className="serif"
                  style={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: 1.35,
                    color: a.active ? 'var(--text)' : 'var(--text-3)',
                    letterSpacing: '-0.005em',
                    fontStyle: 'italic',
                  }}
                >
                  {a.text}
                </div>
                {!a.active && (
                  <div className="eyebrow" style={{ fontSize: 9, marginTop: 6 }}>
                    Paused
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Habits" caption="Votes you cast for this identity" onAdd={() => {}}>
          <div
            style={{
              margin: '0 16px',
              background: 'var(--bg-2)',
              border: '0.5px solid var(--hairline)',
              borderRadius: 22,
              overflow: 'hidden',
            }}
          >
            {habits.map((h, i) => (
              <div
                key={h.id}
                style={{
                  padding: '14px 20px',
                  borderTop: i > 0 ? '0.5px solid var(--hairline)' : 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 28,
                    borderRadius: 2,
                    background: identity.color,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, color: 'var(--text)' }}>
                    {h.name}
                    {h.targetType === 'quantified' && (
                      <span style={{ color: 'var(--text-3)', marginLeft: 6, fontSize: 13 }}>
                        · {h.target} {h.unit}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
                    {DAY_LETTERS.map((l, j) => (
                      <div
                        key={j}
                        style={{
                          width: 12,
                          height: 12,
                          fontSize: 8,
                          color: h.days.includes(j as 0 | 1 | 2 | 3 | 4 | 5 | 6)
                            ? 'var(--text-2)'
                            : 'var(--text-3)',
                          opacity: h.days.includes(j as 0 | 1 | 2 | 3 | 4 | 5 | 6)
                            ? 1
                            : 0.4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 20,
                    color: 'var(--text-2)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {h.streak}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Visualization scenes"
          caption="What this identity looks like, lived"
          onAdd={() => {}}
        >
          {identity.scenes.length === 0 ? (
            <div
              style={{
                margin: '0 16px',
                padding: '24px 22px',
                background: 'var(--bg-2)',
                border: '0.5px dashed var(--hairline)',
                borderRadius: 22,
                textAlign: 'center',
              }}
            >
              <div
                className="serif"
                style={{
                  fontSize: 16,
                  color: 'var(--text-2)',
                  lineHeight: 1.5,
                  marginBottom: 12,
                  fontStyle: 'italic',
                }}
              >
                Picture a specific moment that proves this identity is real.
              </div>
              <button
                type="button"
                className="tend-btn-ghost"
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text)',
                  background: 'transparent',
                  border: '0.5px solid var(--hairline)',
                  cursor: 'pointer',
                }}
              >
                Author a scene
              </button>
            </div>
          ) : (
            identity.scenes.map((s) => (
              <div
                key={s.id}
                style={{
                  margin: '0 16px',
                  padding: '18px 22px',
                  background: 'var(--bg-2)',
                  border: '0.5px solid var(--hairline)',
                  borderRadius: 22,
                }}
              >
                <div
                  className="serif"
                  style={{
                    fontSize: 18,
                    color: 'var(--text)',
                    marginBottom: 8,
                    letterSpacing: '-0.01em',
                    fontStyle: 'italic',
                  }}
                >
                  {s.title}
                </div>
                <div
                  className="serif"
                  style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.5 }}
                >
                  {s.body.length > 220 ? s.body.slice(0, 220) + '…' : s.body}
                </div>
              </div>
            ))
          )}
        </Section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div className="eyebrow" style={{ marginTop: 4, fontSize: 9 }}>
        {label}
      </div>
    </div>
  );
}

function Section({
  title,
  caption,
  onAdd,
  children,
}: {
  title: string;
  caption?: string;
  onAdd?: () => void;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div
        style={{
          padding: '0 26px 10px',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            className="serif"
            style={{
              fontSize: 18,
              color: 'var(--text)',
              letterSpacing: '-0.005em',
              fontStyle: 'italic',
            }}
          >
            {title}
          </div>
          {caption && (
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-3)',
                marginTop: 2,
                letterSpacing: '0.02em',
              }}
            >
              {caption}
            </div>
          )}
        </div>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'transparent',
              border: '0.5px solid var(--hairline)',
              color: 'var(--text-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <IconPlus size={14} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
