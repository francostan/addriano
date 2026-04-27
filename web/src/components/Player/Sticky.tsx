import { usePlayer } from './context';
import { Wave } from './Wave';
import { Time } from './Time';

export function Sticky() {
  const { current, isPlaying, toggle } = usePlayer();
  return (
    <div className="sticky bottom-0 z-40 bg-ink text-paper grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-2 border-t-[1.5px] border-ink">
      <button
        onClick={toggle}
        className="w-9 h-9 bg-lime grid place-items-center"
        aria-label={isPlaying ? 'pause' : 'play'}
      >
        <span className={isPlaying ? 'block w-[3px] h-[10px] border-l-[3px] border-r-[3px] border-ink' : 'block w-0 h-0 border-l-[10px] border-l-ink border-y-[7px] border-y-transparent ml-[3px]'} />
      </button>
      <div className="text-[11px] uppercase tracking-[0.14em]">
        Now Playing
        <b className="block font-display text-sm tracking-normal text-lime">
          {current ? `${'title' in current ? current.title : current.venue} — addriano` : '—'}
        </b>
      </div>
      <Wave />
      <Time />
      {current && (
        <a
          href={current.embedUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] uppercase tracking-[0.16em] border border-paper/30 px-2 py-1"
        >
          SC ↗
        </a>
      )}
    </div>
  );
}
