'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEND_IDENTITIES, TEND_JOURNAL } from '@/lib/demo-data';
import type { JournalKind } from '@/lib/types';

const KIND_LABELS: Record<JournalKind, string> = {
  future_self: 'Future self',
  rehearsal: 'Tomorrow rehearsal',
  reflection: 'Reflection',
  gratitude: 'Gratitude',
};

type Filter = 'all' | JournalKind;

export function TendJournal() {
  const [filter, setFilter] = useState<Filter>('all');
  const router = useRouter();

  const filtered =
    filter === 'all' ? TEND_JOURNAL : TEND_JOURNAL.filter((j) => j.kind === filter);

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
            What you wrote
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
            Journal
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 20,
            color: 'var(--text-2)',
          }}
        >
          {TEND_JOURNAL.length} entries
        </div>
      </div>

      <div
        className="no-scroll-bar"
        style={{ display: 'flex', gap: 8, padding: '0 22px 18px', overflowX: 'auto' }}
      >
        {(
          [
            ['all', 'All'],
            ['future_self', 'Future self'],
            ['rehearsal', 'Rehearsal'],
            ['reflection', 'Reflection'],
            ['gratitude', 'Gratitude'],
          ] as Array<[Filter, string]>
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              border:
                '0.5px solid ' + (filter === k ? 'transparent' : 'var(--hairline)'),
              background: filter === k ? 'var(--ink)' : 'transparent',
              color: filter === k ? 'var(--bg)' : 'var(--text-2)',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.005em',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className="no-scroll-bar"
        style={{ flex: 1, overflowY: 'auto', paddingBottom: 110 }}
      >
        <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {filtered.map((j) => {
            const identity = j.identityId
              ? TEND_IDENTITIES.find((i) => i.id === j.identityId) ?? null
              : null;
            const isMultiline = j.body.includes('\n');
            return (
              <article
                key={j.id}
                style={{ position: 'relative', paddingLeft: 14 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: 1,
                    background: identity ? identity.color : 'var(--hairline)',
                    opacity: identity ? 0.6 : 1,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <div className="eyebrow" style={{ fontSize: 10 }}>
                    {KIND_LABELS[j.kind]}
                  </div>
                  <span className="divider-dot">·</span>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 14,
                      color: 'var(--text-3)',
                    }}
                  >
                    {j.date}
                  </div>
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: 'var(--text)',
                    letterSpacing: '-0.003em',
                    whiteSpace: isMultiline ? 'pre-line' : 'normal',
                  }}
                >
                  {j.body}
                </div>
                {identity && (
                  <button
                    type="button"
                    onClick={() => router.push(`/identity/${identity.id}`)}
                    style={{
                      background: 'transparent',
                      border: 0,
                      padding: '8px 0 0',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="tend-chip">
                      <span className="dot" style={{ background: identity.color }} />
                      <span>{identity.statement}</span>
                    </div>
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
