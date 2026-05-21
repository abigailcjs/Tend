'use client';

import { useEffect, useMemo, useState } from 'react';
import { TEND_HABITS, TEND_IDENTITIES } from '@/lib/demo-data';
import { IconChevL, IconChevR, IconMoon } from '@/components/icons';

// ───────────────────────────────────────────────────────────────
// 1. CENTERING — breath visualizer
// ───────────────────────────────────────────────────────────────
export function BlockCentering() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
      }}
    >
      <div className="eyebrow tend-fade">Arrive</div>
      <div
        style={{
          width: 220,
          height: 220,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="tend-breath"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '0.5px solid var(--accent)',
            opacity: 0.25,
          }}
        />
        <div
          className="tend-breath"
          style={{
            position: 'absolute',
            inset: 22,
            borderRadius: '50%',
            background: 'var(--accent-soft)',
            animationDelay: '-1s',
          }}
        />
        <div
          className="tend-breath"
          style={{
            position: 'absolute',
            inset: 60,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.4,
            animationDelay: '-2s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 28,
            color: 'var(--text)',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          <BreathText />
        </div>
      </div>
      <div
        className="serif tend-fade"
        style={{
          fontSize: 17,
          color: 'var(--text-2)',
          textAlign: 'center',
          maxWidth: 240,
          lineHeight: 1.4,
          animationDelay: '0.4s',
          fontStyle: 'italic',
        }}
      >
        Let the body arrive before the mind starts.
      </div>
    </div>
  );
}

function BreathText() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  useEffect(() => {
    const t = setInterval(() => {
      setPhase((p) => (p === 'in' ? 'hold' : p === 'hold' ? 'out' : 'in'));
    }, 2666);
    return () => clearInterval(t);
  }, []);
  return <span>{phase === 'in' ? 'breathe in' : phase === 'hold' ? '…hold' : 'breathe out'}</span>;
}

// ───────────────────────────────────────────────────────────────
// 2. AFFIRMATIONS — cycle through active affirmations
// ───────────────────────────────────────────────────────────────
export function BlockAffirmations() {
  const items = useMemo(() => {
    const out: { text: string; identity: (typeof TEND_IDENTITIES)[number] }[] = [];
    TEND_IDENTITIES.forEach((id) => {
      id.affirmations
        .filter((a) => a.active)
        .forEach((a) => out.push({ text: a.text, identity: id }));
    });
    return out;
  }, []);

  const [i, setI] = useState(0);
  const cur = items[i];

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 80,
      }}
    >
      <div style={{ height: 30 }} />

      <div style={{ width: '100%', textAlign: 'center' }}>
        <div className="eyebrow tend-fade" style={{ marginBottom: 30 }}>
          You said
        </div>
        <div
          key={i}
          className="tend-fade"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 40,
            lineHeight: 1.15,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            padding: '0 8px',
          }}
        >
          <span style={{ color: 'var(--text-3)' }}>“</span>
          <span style={{ fontStyle: 'italic' }}>{cur.text.replace(/[.]$/, '')}</span>
          <span style={{ color: 'var(--text-3)' }}>.”</span>
        </div>
        <div
          key={'c' + i}
          className="tend-chip tend-fade"
          style={{ marginTop: 26, justifyContent: 'center' }}
        >
          <span className="dot" style={{ background: cur.identity.color }} />
          <span>{cur.identity.statement}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          color: 'var(--text-3)',
        }}
      >
        <button
          type="button"
          onClick={() => setI((i - 1 + items.length) % items.length)}
          style={{
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: 'inherit',
            padding: 8,
          }}
        >
          <IconChevL size={18} />
        </button>
        <div style={{ display: 'flex', gap: 5 }}>
          {items.map((_, j) => (
            <div
              key={j}
              style={{
                width: j === i ? 16 : 4,
                height: 4,
                borderRadius: 2,
                background: j === i ? 'var(--text-2)' : 'var(--text-3)',
                opacity: j === i ? 1 : 0.45,
                transition: 'all 0.4s var(--ease)',
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setI((i + 1) % items.length)}
          style={{
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: 'inherit',
            padding: 8,
          }}
        >
          <IconChevR size={18} />
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// 3. VISUALIZATION — user-authored scene
// ───────────────────────────────────────────────────────────────
export function BlockVisualization() {
  const sceneOwner = TEND_IDENTITIES.find((i) => i.scenes.length > 0)!;
  const scene = sceneOwner.scenes[0];

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        paddingTop: 8,
      }}
    >
      <div className="tend-fade">
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Picture it
        </div>
        <div
          className="serif"
          style={{
            fontSize: 30,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            fontStyle: 'italic',
          }}
        >
          {scene.title}
        </div>
        <div className="tend-chip" style={{ marginTop: 12 }}>
          <span className="dot" style={{ background: sceneOwner.color }} />
          <span>{sceneOwner.statement}</span>
        </div>
      </div>

      <div
        className="tend-fade no-scroll-bar"
        style={{
          flex: 1,
          overflowY: 'auto',
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          lineHeight: 1.45,
          color: 'var(--text-2)',
          letterSpacing: '-0.005em',
          animationDelay: '0.3s',
        }}
      >
        {scene.body}
      </div>

      <div
        className="tend-fade"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: 'var(--text-3)',
          fontSize: 13,
          animationDelay: '0.6s',
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'tend-breathe 3.5s ease-in-out infinite',
          }}
        />
        Stay in the scene until it feels real.
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// 4. MENTAL REHEARSAL — picture today's key moment
// ───────────────────────────────────────────────────────────────
export function BlockRehearsal() {
  const [value, setValue] = useState(
    'The meeting at 2. I sit down with no notes. I listen first. I ask one question before answering. I stay slow.',
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div className="tend-fade">
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Today’s key moment
        </div>
        <div
          className="serif"
          style={{
            fontSize: 28,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontStyle: 'italic',
          }}
        >
          Picture one moment going well.
        </div>
        <div
          style={{
            fontSize: 14,
            color: 'var(--text-3)',
            marginTop: 10,
            lineHeight: 1.4,
          }}
        >
          Where are you? Who else is there? How are you carrying yourself?
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="The moment…"
        className="tend-fade"
        style={{
          flex: 1,
          background: 'var(--bg-2)',
          border: '0.5px solid var(--hairline)',
          borderRadius: 18,
          padding: 18,
          color: 'var(--text)',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 20,
          lineHeight: 1.45,
          letterSpacing: '-0.005em',
          resize: 'none',
          outline: 'none',
          animationDelay: '0.3s',
        }}
      />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// 5. FUTURE-SELF JOURNALING
// ───────────────────────────────────────────────────────────────
export function BlockFutureSelf() {
  const identity = TEND_IDENTITIES[0];
  const [value, setValue] = useState('Today I ');
  const words = value.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="tend-fade">
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Write as the person
        </div>
        <div
          className="serif"
          style={{
            fontSize: 28,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontStyle: 'italic',
          }}
        >
          A paragraph from
          <br />
          <span style={{ color: 'var(--accent)' }}>tomorrow’s you.</span>
        </div>
        <div className="tend-chip" style={{ marginTop: 12 }}>
          <span className="dot" style={{ background: identity.color }} />
          <span>{identity.statement}</span>
        </div>
      </div>

      <div
        className="tend-fade"
        style={{ flex: 1, position: 'relative', animationDelay: '0.3s' }}
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 0,
            padding: 0,
            color: 'var(--text)',
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            lineHeight: 1.5,
            letterSpacing: '-0.005em',
            resize: 'none',
            outline: 'none',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--text-3)',
          fontSize: 12,
        }}
      >
        <span>{words} words</span>
        <span style={{ fontStyle: 'italic' }}>From the perspective of done</span>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// 6. DAY PREVIEW
// ───────────────────────────────────────────────────────────────
export function BlockPreview() {
  const today = TEND_HABITS.filter((h) => h.days.includes(4));
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="tend-fade">
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Today
        </div>
        <div
          className="serif"
          style={{
            fontSize: 28,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontStyle: 'italic',
          }}
        >
          Six small votes
          <br />
          <span style={{ color: 'var(--text-3)' }}>for who you are.</span>
        </div>
      </div>

      <div
        className="tend-fade"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          animationDelay: '0.3s',
        }}
      >
        {today.map((h, idx) => {
          const id = TEND_IDENTITIES.find((i) => i.id === h.identityId)!;
          return (
            <div
              key={h.id}
              className="tend-fade"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 18px',
                background: 'var(--bg-2)',
                borderRadius: 16,
                border: '0.5px solid var(--hairline)',
                animationDelay: 0.3 + idx * 0.08 + 's',
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 32,
                  borderRadius: 2,
                  background: id.color,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, color: 'var(--text)' }}>{h.name}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--text-3)',
                    marginTop: 2,
                    letterSpacing: '0.04em',
                  }}
                >
                  {h.cue || ' '}
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-3)',
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                }}
              >
                {h.targetType === 'quantified' ? `${h.target} ${h.unit}` : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// 7. REFLECTION
// ───────────────────────────────────────────────────────────────
export function BlockReflection() {
  const [v, setV] = useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div className="tend-fade">
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Reflection
        </div>
        <div
          className="serif"
          style={{
            fontSize: 30,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            fontStyle: 'italic',
          }}
        >
          What showed up today?
        </div>
      </div>
      <textarea
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Write honestly. No-one is reading this."
        className="tend-fade"
        style={{
          flex: 1,
          background: 'var(--bg-2)',
          border: '0.5px solid var(--hairline)',
          borderRadius: 18,
          padding: 18,
          color: 'var(--text)',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 20,
          lineHeight: 1.45,
          resize: 'none',
          outline: 'none',
          animationDelay: '0.3s',
        }}
      />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// 8. TOMORROW REHEARSAL
// ───────────────────────────────────────────────────────────────
export function BlockTomorrow() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 32,
      }}
    >
      <div className="tend-fade tend-breath" style={{ color: 'var(--accent)' }}>
        <IconMoon size={56} stroke={1} />
      </div>
      <div className="tend-fade">
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          Tomorrow
        </div>
        <div
          className="serif"
          style={{
            fontSize: 30,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            maxWidth: 280,
            fontStyle: 'italic',
          }}
        >
          Walk through the moment that matters.
        </div>
      </div>
      <div
        className="tend-fade serif"
        style={{
          fontSize: 18,
          lineHeight: 1.5,
          color: 'var(--text-2)',
          maxWidth: 280,
          animationDelay: '0.3s',
          padding: '20px 24px',
          background: 'var(--bg-2)',
          borderRadius: 18,
          border: '0.5px solid var(--hairline)',
          textAlign: 'left',
          fontStyle: 'italic',
        }}
      >
        Tomorrow at 8am you sit down at the desk. Phone is in the other room. The first thing
        you open is the document.
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// 9. GRATITUDE
// ───────────────────────────────────────────────────────────────
export function BlockGratitude() {
  const [items, setItems] = useState<[string, string, string]>(['', '', '']);
  const update = (i: number, v: string) =>
    setItems((prev) => prev.map((x, j) => (j === i ? v : x)) as [string, string, string]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="tend-fade">
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Gratitude
        </div>
        <div
          className="serif"
          style={{
            fontSize: 30,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            fontStyle: 'italic',
          }}
        >
          Three small things from today.
        </div>
      </div>
      <div
        className="tend-fade"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          animationDelay: '0.3s',
        }}
      >
        {items.map((v, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              padding: '16px 18px',
              background: 'var(--bg-2)',
              border: '0.5px solid var(--hairline)',
              borderRadius: 16,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 22,
                color: 'var(--accent)',
                lineHeight: 1,
                marginTop: 2,
              }}
            >
              {i + 1}.
            </div>
            <input
              value={v}
              onChange={(e) => update(i, e.target.value)}
              placeholder={
                i === 0
                  ? 'something the light did'
                  : i === 1
                    ? 'someone you noticed'
                    : 'something small'
              }
              style={{
                flex: 1,
                background: 'transparent',
                border: 0,
                outline: 'none',
                color: 'var(--text)',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 19,
                lineHeight: 1.3,
                padding: 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
