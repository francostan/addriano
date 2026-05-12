import type { MouseEvent } from 'react';
import { usePlayer } from './context';

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function Inline() {
  const { current, isPlaying, isMobile, position, duration, toggle, seek } = usePlayer();
  if (isMobile) return null;

  const pct = duration > 0 ? Math.min(100, (position / duration) * 100) : 0;
  const title = current ? current.title : '— NO TRACK —';

  function onSeek(e: MouseEvent<HTMLDivElement>) {
    if (!current || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(Math.max(0, Math.min(1, ratio)) * duration);
  }

  return (
    <div className="flex-1 max-w-[560px] hidden md:flex items-center gap-3 text-ink">
      <button
        onClick={toggle}
        disabled={!current}
        className="w-8 h-8 bg-lime border-[1.5px] border-ink grid place-items-center disabled:opacity-40 shrink-0 transition-transform hover:scale-105"
        aria-label={isPlaying ? 'pause' : 'play'}
      >
        <span
          className={
            isPlaying
              ? 'block w-[3px] h-[10px] border-l-[3px] border-r-[3px] border-ink'
              : 'block w-0 h-0 border-l-[9px] border-l-ink border-y-[6px] border-y-transparent ml-[2px]'
          }
        />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3 leading-none">
          <span className="text-[10px] uppercase tracking-[0.16em] text-ink-2 shrink-0">NOW PLAYING</span>
          <span className="font-display text-[12px] tracking-tight truncate flex-1">{title}</span>
          <span className="text-[10px] tabular-nums text-ink-2 shrink-0">
            {fmt(position)} / {fmt(duration)}
          </span>
        </div>
        <div
          role="slider"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={position}
          onClick={onSeek}
          className="h-[3px] bg-ink/15 cursor-pointer relative mt-1.5"
        >
          <div className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
