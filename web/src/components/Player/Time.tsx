import { usePlayer } from './context';

export function Time() {
  const { current } = usePlayer();
  return (
    <span className="text-[11px] tabular-nums text-paper/60">
      00:00 / {current?.duration ?? '00:00'}
    </span>
  );
}
