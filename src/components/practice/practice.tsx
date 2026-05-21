'use client';

import { useState } from 'react';
import { EVENING_TEMPLATE, MORNING_TEMPLATE, TEND_BLOCKS } from '@/lib/demo-data';
import type { BlockId, PracticeKind } from '@/lib/types';
import { IconChevL, IconChevR, IconClose } from '@/components/icons';
import {
  BlockCentering,
  BlockAffirmations,
  BlockVisualization,
  BlockRehearsal,
  BlockFutureSelf,
  BlockPreview,
  BlockReflection,
  BlockTomorrow,
  BlockGratitude,
} from './blocks';

export function TendPractice({
  kind,
  onExit,
}: {
  kind: PracticeKind;
  onExit: () => void;
}) {
  const blockIds = kind === 'morning' ? MORNING_TEMPLATE : EVENING_TEMPLATE;
  const [idx, setIdx] = useState(0);

  const currentId = blockIds[idx];
  const block = TEND_BLOCKS.find((b) => b.id === currentId)!;
  const isFirst = idx === 0;
  const isLast = idx === blockIds.length - 1;

  const next = () => {
    if (isLast) onExit();
    else setIdx((i) => i + 1);
  };
  const prev = () => {
    if (!isFirst) setIdx((i) => i - 1);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--bg-grad, var(--bg))',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
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
          padding: '0 20px',
          zIndex: 10,
        }}
      >
        <button
          type="button"
          onClick={isFirst ? onExit : prev}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: 'var(--text-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isFirst ? <IconClose size={20} /> : <IconChevL size={20} />}
        </button>
        <div className="eyebrow" style={{ letterSpacing: '0.18em', fontSize: 10 }}>
          {kind === 'morning' ? 'Morning' : 'Evening'} · {block.duration}
        </div>
        <button
          type="button"
          onClick={onExit}
          style={{
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: 'var(--text-3)',
            fontSize: 12,
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.04em',
          }}
        >
          End
        </button>
      </div>

      <div className="tend-dots" style={{ top: 98 }}>
        {blockIds.map((_, i) => (
          <i
            key={i}
            data-active={i === idx ? '1' : '0'}
            data-done={i < idx ? '1' : '0'}
          />
        ))}
      </div>

      <div
        key={currentId}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '120px 28px 24px',
          overflow: 'hidden',
        }}
      >
        <PracticeBlock blockId={block.id} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '24px 28px 50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, transparent, var(--bg) 50%)',
          zIndex: 20,
        }}
      >
        <button
          type="button"
          onClick={next}
          style={{
            background: 'var(--ink)',
            color: 'var(--bg)',
            border: 0,
            borderRadius: 999,
            padding: '15px 22px',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            letterSpacing: '-0.01em',
          }}
        >
          {isLast ? 'Complete' : 'Continue'}
          {!isLast && <IconChevR size={16} />}
        </button>
        <button
          type="button"
          onClick={next}
          style={{
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: 'var(--text-3)',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
          }}
        >
          Skip block
        </button>
      </div>
    </div>
  );
}

function PracticeBlock({ blockId }: { blockId: BlockId }) {
  switch (blockId) {
    case 'centering':
      return <BlockCentering />;
    case 'affirmations':
      return <BlockAffirmations />;
    case 'visualization':
      return <BlockVisualization />;
    case 'rehearsal':
      return <BlockRehearsal />;
    case 'future_self':
      return <BlockFutureSelf />;
    case 'preview':
      return <BlockPreview />;
    case 'reflection':
      return <BlockReflection />;
    case 'tomorrow':
      return <BlockTomorrow />;
    case 'gratitude':
      return <BlockGratitude />;
    default:
      return null;
  }
}
