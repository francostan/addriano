import { usePlayer } from './context';

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function Time() {
  const { position, duration } = usePlayer();
  return (
    <span className="text-[11px] tabular-nums text-paper/60 whitespace-nowrap">
      {fmt(position)} / {fmt(duration)}
    </span>
  );
}
