import { usePlayer } from './context';
import type { Playable } from '../../types';

type Props = { item: Playable; size?: 'sm' | 'md' };

export function Button({ item, size = 'sm' }: Props) {
  const { current, isPlaying, play, pause } = usePlayer();
  const active = current?.id === item.id && isPlaying;
  const dim = size === 'md' ? 'w-8 h-8' : 'w-5 h-5';
  return (
    <button
      onClick={() => (active ? pause() : play(item))}
      className={`${dim} border-[1.5px] border-ink rounded-full grid place-items-center bg-paper hover:bg-lime transition-colors`}
      aria-label={active ? 'pause' : 'play'}
    >
      <span className={active ? 'block w-[3px] h-[8px] border-l-[3px] border-r-[3px] border-ink' : 'block w-0 h-0 border-l-[6px] border-l-ink border-y-[4px] border-y-transparent ml-[2px]'} />
    </button>
  );
}
