'use client';

import { useState } from 'react';
import { useTend } from '@/lib/store';
import type { Aesthetic, TodayState } from '@/lib/types';

// Floating dev panel — lets you flip aesthetic / today state without changing routes.
// Hidden by default; toggle with the gear chip in the corner.
export function DevTweaks() {
  const [open, setOpen] = useState(false);
  const aesthetic = useTend((s) => s.aesthetic);
  const dark = useTend((s) => s.dark);
  const bodySerif = useTend((s) => s.bodySerif);
  const todayState = useTend((s) => s.todayState);
  const setAesthetic = useTend((s) => s.setAesthetic);
  const setDark = useTend((s) => s.setDark);
  const setBodySerif = useTend((s) => s.setBodySerif);
  const setTodayState = useTend((s) => s.setTodayState);
  const beginPractice = useTend((s) => s.beginPractice);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          padding: '8px 12px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.08)',
          color: '#fff',
          border: '0.5px solid rgba(255,255,255,0.2)',
          cursor: 'pointer',
          fontSize: 11,
          fontFamily:
            '-apple-system, "SF Pro Text", system-ui, sans-serif',
          letterSpacing: '0.04em',
          zIndex: 100,
        }}
      >
        tweaks
      </button>
    );
  }

  const card: React.CSSProperties = {
    position: 'fixed',
    right: 16,
    bottom: 16,
    width: 260,
    background: 'rgba(20,20,20,0.92)',
    color: '#fff',
    border: '0.5px solid rgba(255,255,255,0.15)',
    borderRadius: 14,
    padding: 14,
    fontFamily: '-apple-system, "SF Pro Text", system-ui, sans-serif',
    fontSize: 12,
    zIndex: 100,
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
  };
  const row: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '6px 0',
  };
  const btn: React.CSSProperties = {
    background: 'rgba(255,255,255,0.07)',
    color: '#fff',
    border: '0.5px solid rgba(255,255,255,0.18)',
    borderRadius: 7,
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: 11,
  };
  const btnActive: React.CSSProperties = {
    ...btn,
    background: '#fff',
    color: '#111',
  };

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <strong style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Tweaks
        </strong>
        <button type="button" onClick={() => setOpen(false)} style={btn}>
          close
        </button>
      </div>

      <div style={{ opacity: 0.7, fontSize: 10, marginTop: 8 }}>Aesthetic</div>
      <div style={{ display: 'flex', gap: 6, margin: '6px 0' }}>
        {(['grove', 'paper', 'minimal'] as Aesthetic[]).map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAesthetic(a)}
            style={aesthetic === a ? btnActive : btn}
          >
            {a}
          </button>
        ))}
      </div>

      <div style={row}>
        <span>Dark</span>
        <button type="button" onClick={() => setDark(!dark)} style={dark ? btnActive : btn}>
          {dark ? 'on' : 'off'}
        </button>
      </div>
      <div style={row}>
        <span>Serif body</span>
        <button
          type="button"
          onClick={() => setBodySerif(!bodySerif)}
          style={bodySerif ? btnActive : btn}
        >
          {bodySerif ? 'on' : 'off'}
        </button>
      </div>

      <div style={{ opacity: 0.7, fontSize: 10, marginTop: 10 }}>Today state</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '6px 0' }}>
        {(['morning', 'daytime', 'evening', 'late'] as TodayState[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setTodayState(s)}
            style={todayState === s ? btnActive : btn}
          >
            {s}
          </button>
        ))}
      </div>

      <div style={{ opacity: 0.7, fontSize: 10, marginTop: 10 }}>Practice</div>
      <div style={{ display: 'flex', gap: 6, margin: '6px 0' }}>
        <button type="button" onClick={() => beginPractice('morning')} style={btn}>
          start morning
        </button>
        <button type="button" onClick={() => beginPractice('evening')} style={btn}>
          start evening
        </button>
      </div>
    </div>
  );
}
