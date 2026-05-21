'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTend } from '@/lib/store';
import { TendPractice } from './practice/practice';
import { TabBar } from './tab-bar';
import { ProfileSheet } from './profile-sheet';
import { DevTweaks } from './dev-tweaks';
import { ServiceWorkerRegister } from './service-worker';

export function AppShell({ children }: { children: React.ReactNode }) {
  const aesthetic = useTend((s) => s.aesthetic);
  const dark = useTend((s) => s.dark);
  const accent = useTend((s) => s.accent);
  const bodySerif = useTend((s) => s.bodySerif);
  const practice = useTend((s) => s.practice);
  const profileOpen = useTend((s) => s.profileOpen);
  const setProfileOpen = useTend((s) => s.setProfileOpen);
  const endPractice = useTend((s) => s.endPractice);

  const pathname = usePathname();
  const router = useRouter();

  // Sync top-level aesthetic data attributes onto <html> so global styles work.
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-aesthetic', aesthetic);
    html.setAttribute('data-dark', dark ? '1' : '0');
  }, [aesthetic, dark]);

  const showTabs =
    !practice &&
    (pathname === '/' || pathname === '/habits' || pathname === '/journal');

  return (
    <div className="tend-canvas">
      <div
        className="tend-app"
        data-aesthetic={aesthetic}
        data-dark={dark ? '1' : '0'}
        data-body-serif={bodySerif ? '1' : '0'}
        style={
          {
            '--accent-override': accent,
            width: 'min(100vw, 430px)',
            height: 'min(100vh, 900px)',
            maxHeight: '100dvh',
            borderRadius: 28,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'var(--shadow)',
          } as React.CSSProperties
        }
      >
        {children}

        {showTabs && (
          <TabBar
            route={pathname === '/' ? 'today' : pathname === '/habits' ? 'habits' : 'journal'}
            onChange={(r) => router.push(r === 'today' ? '/' : `/${r}`)}
          />
        )}

        {profileOpen && (
          <ProfileSheet
            onClose={() => setProfileOpen(false)}
            onIdentities={() => {
              setProfileOpen(false);
              router.push('/identities');
            }}
            onTemplates={() => {
              setProfileOpen(false);
              router.push('/');
            }}
          />
        )}

        {practice && (
          <TendPractice kind={practice.kind} onExit={endPractice} />
        )}
      </div>
      {process.env.NODE_ENV !== 'production' && <DevTweaks />}
      <ServiceWorkerRegister />
    </div>
  );
}
