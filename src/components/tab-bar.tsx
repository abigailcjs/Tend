'use client';

import { IconBook, IconFlame, IconHome } from './icons';

export type TabRoute = 'today' | 'habits' | 'journal';

export function TabBar({ route, onChange }: { route: TabRoute; onChange: (r: TabRoute) => void }) {
  const tabs: Array<[TabRoute, string, typeof IconHome]> = [
    ['today', 'Today', IconHome],
    ['habits', 'Habits', IconFlame],
    ['journal', 'Journal', IconBook],
  ];
  return (
    <div className="tend-tabbar">
      {tabs.map(([k, label, I]) => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          data-active={route === k ? '1' : '0'}
        >
          <I size={22} stroke={route === k ? 1.6 : 1.3} />
          <span style={{ fontSize: 10, letterSpacing: '0.05em' }}>{label}</span>
        </button>
      ))}
    </div>
  );
}
