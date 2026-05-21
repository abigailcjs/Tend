// Line icons used throughout Tend. All inherit currentColor via stroke="currentColor".
import type { CSSProperties, ReactNode } from 'react';
import type { BlockIcon as BlockIconName } from '@/lib/types';

export interface IconProps {
  size?: number;
  stroke?: number;
  style?: CSSProperties;
  className?: string;
}

interface BaseProps extends IconProps {
  children: ReactNode;
}

function Icon({ size = 20, stroke = 1.4, children, style, className }: BaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      {children}
    </svg>
  );
}

// ────── Tab bar
export const IconHome = (p: IconProps) => (
  <Icon {...p}><path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" /></Icon>
);
export const IconFlame = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3c2.5 3.5 5 5.5 5 9a5 5 0 1 1-10 0c0-1.7.7-2.9 2-4.5C10 9 11 6.5 12 3z" />
    <path d="M12 21v-3" />
  </Icon>
);
export const IconBook = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 5a2 2 0 0 1 2-2h11v16H7a2 2 0 0 0-2 2z" />
    <path d="M5 5v16" />
  </Icon>
);

// ────── App actions
export const IconUser = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5" />
  </Icon>
);
export const IconChevR = (p: IconProps) => (<Icon {...p} stroke={p.stroke ?? 1.6}><path d="M9 5l7 7-7 7" /></Icon>);
export const IconChevL = (p: IconProps) => (<Icon {...p} stroke={p.stroke ?? 1.6}><path d="M15 5l-7 7 7 7" /></Icon>);
export const IconChevD = (p: IconProps) => (<Icon {...p} stroke={p.stroke ?? 1.6}><path d="M5 9l7 7 7-7" /></Icon>);
export const IconPlus = (p: IconProps) => (<Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>);
export const IconCheck = (p: IconProps) => (<Icon {...p} stroke={p.stroke ?? 2}><path d="M5 12.5l4.5 4.5L19 7" /></Icon>);
export const IconClose = (p: IconProps) => (<Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>);
export const IconMore = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="6" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="18" cy="12" r="1" />
  </Icon>
);

// ────── Block icons
export const IconBreath = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4.5" strokeOpacity={0.5} />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </Icon>
);
export const IconSpeech = (p: IconProps) => (
  <Icon {...p}><path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-4l-4 4v-4H7a3 3 0 0 1-3-3z" /></Icon>
);
export const IconEye = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="2.8" />
  </Icon>
);
export const IconTarget = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" />
  </Icon>
);
export const IconPen = (p: IconProps) => (
  <Icon {...p}>
    <path d="M16.5 3.5l4 4L8 20H4v-4z" />
    <path d="M13.5 6.5l4 4" />
  </Icon>
);
export const IconList = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 6h12M8 12h12M8 18h12" />
    <circle cx="4" cy="6" r="1" fill="currentColor" />
    <circle cx="4" cy="12" r="1" fill="currentColor" />
    <circle cx="4" cy="18" r="1" fill="currentColor" />
  </Icon>
);
export const IconMirror = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3c-4 0-7 3.5-7 8s3 8 7 8 7-3.5 7-8-3-8-7-8z" />
    <path d="M12 21v-2" />
    <path d="M9 11c0-2 1.3-3.5 3-3.5" />
  </Icon>
);
export const IconMoon = (p: IconProps) => (
  <Icon {...p}><path d="M20 14a8 8 0 1 1-10-10 6.5 6.5 0 0 0 10 10z" /></Icon>
);
export const IconSun = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
  </Icon>
);

export const BLOCK_ICON: Record<BlockIconName, (p: IconProps) => JSX.Element> = {
  breath: IconBreath,
  speech: IconSpeech,
  eye: IconEye,
  target: IconTarget,
  pen: IconPen,
  list: IconList,
  mirror: IconMirror,
  moon: IconMoon,
  flame: IconFlame,
};
