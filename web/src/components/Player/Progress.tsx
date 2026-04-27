import { usePlayer } from './context';

export function Progress() {
  const { position, duration, seek, current } = usePlayer();
  const pct = duration > 0 ? Math.min(100, (position / duration) * 100) : 0;

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!current || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(Math.max(0, Math.min(1, ratio)) * duration);
  }

  return (
    <div
      role="slider"
      aria-valuemin={0}
      aria-valuemax={duration}
      aria-valuenow={position}
      onClick={onClick}
      className="h-1.5 bg-paper/15 cursor-pointer relative"
    >
      <div className="absolute inset-y-0 left-0 bg-lime" style={{ width: `${pct}%` }} />
    </div>
  );
}
