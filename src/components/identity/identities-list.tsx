'use client';

import { useRouter } from 'next/navigation';
import { TEND_HABITS, TEND_IDENTITIES } from '@/lib/demo-data';
import { IconChevL, IconPlus } from '@/components/icons';

export function TendIdentitiesList() {
  const router = useRouter();
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
          onClick={() => router.push('/')}
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
          <span>Today</span>
        </button>
        <button
          type="button"
          style={{
            width: 32,
            height: 32,
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: 'var(--text-2)',
          }}
        >
          <IconPlus size={20} />
        </button>
      </div>

      <div
        className="no-scroll-bar"
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: 100,
          paddingBottom: 40,
        }}
      >
        <div style={{ padding: '0 26px 18px' }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            The spine
          </div>
          <div
            className="serif"
            style={{
              fontSize: 36,
              color: 'var(--text)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              fontStyle: 'italic',
            }}
          >
            Identities
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'var(--text-2)',
              lineHeight: 1.45,
              marginTop: 14,
              maxWidth: 320,
            }}
          >
            Everything in Tend hangs off these. Affirmations support them. Habits vote for
            them.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: '0 16px',
          }}
        >
          {TEND_IDENTITIES.map((id) => {
            const habits = TEND_HABITS.filter((h) => h.identityId === id.id);
            return (
              <button
                key={id.id}
                type="button"
                onClick={() => router.push(`/identity/${id.id}`)}
                style={{
                  background: 'var(--bg-2)',
                  border: '0.5px solid var(--hairline)',
                  borderRadius: 22,
                  padding: '18px 20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: id.color,
                  }}
                />
                <div
                  className="serif"
                  style={{
                    fontSize: 20,
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    marginBottom: 12,
                    paddingLeft: 4,
                    fontStyle: 'italic',
                  }}
                >
                  {id.statement}
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    paddingLeft: 4,
                    fontSize: 12,
                    color: 'var(--text-3)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <span>{id.affirmations.length} affirmations</span>
                  <span>·</span>
                  <span>{habits.length} habits</span>
                  <span>·</span>
                  <span>{id.scenes.length} scenes</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
