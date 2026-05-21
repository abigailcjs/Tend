'use client';

import { IconChevR } from './icons';

export function ProfileSheet({
  onClose,
  onIdentities,
  onTemplates,
}: {
  onClose: () => void;
  onIdentities: () => void;
  onTemplates: () => void;
}) {
  return (
    <div className="tend-sheet" onClick={onClose}>
      <div className="tend-sheet-bg" />
      <div className="tend-sheet-card" onClick={(e) => e.stopPropagation()}>
        <div className="tend-sheet-grip" />
        <div style={{ padding: '8px 24px 18px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              paddingBottom: 18,
              borderBottom: '0.5px solid var(--hairline)',
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'var(--accent-soft)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 24,
              }}
            >
              m
            </div>
            <div>
              <div
                className="serif italic-soft"
                style={{ fontSize: 18, color: 'var(--text)', fontStyle: 'italic' }}
              >
                Day 47 of tending.
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>
                Started April 5
              </div>
            </div>
          </div>
        </div>

        <SheetRow label="Identities" caption="The spine of everything" onClick={onIdentities} />
        <SheetRow label="Templates" caption="Edit morning & evening practice" onClick={onTemplates} />
        <SheetRow label="Reminders" caption="Quiet nudges, your times" onClick={() => {}} />
        <SheetRow label="Export" caption="Your data, your file" onClick={() => {}} />

        <div style={{ padding: '24px 24px 0' }}>
          <div
            className="serif"
            style={{
              fontSize: 14,
              color: 'var(--text-3)',
              textAlign: 'center',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            “I tend to who I’m becoming.”
          </div>
        </div>
      </div>
    </div>
  );
}

function SheetRow({
  label,
  caption,
  onClick,
}: {
  label: string;
  caption: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        background: 'transparent',
        border: 0,
        borderTop: '0.5px solid var(--hairline)',
        padding: '16px 24px',
        cursor: 'pointer',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        textAlign: 'left',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, color: 'var(--text)' }}>{label}</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{caption}</div>
      </div>
      <IconChevR size={16} style={{ color: 'var(--text-3)' }} />
    </button>
  );
}
