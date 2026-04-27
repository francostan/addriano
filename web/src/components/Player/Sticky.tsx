import { usePlayer } from './context';
import { Time } from './Time';
import { Progress } from './Progress';

export function Sticky() {
  const { current, isPlaying, toggle } = usePlayer();
  return (
    <div className="sticky bottom-0 z-40 bg-ink text-paper border-t-[1.5px] border-ink">
      <Progress />
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-5 py-2">
        <button
          onClick={toggle}
          disabled={!current}
          className="w-9 h-9 bg-lime grid place-items-center disabled:opacity-40"
          aria-label={isPlaying ? 'pause' : 'play'}
        >
          <span className={isPlaying ? 'block w-[3px] h-[10px] border-l-[3px] border-r-[3px] border-ink' : 'block w-0 h-0 border-l-[10px] border-l-ink border-y-[7px] border-y-transparent ml-[3px]'} />
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] min-w-0">
          Now Playing
          <b className="block font-display text-sm tracking-normal text-lime truncate">
            {current ? `${'title' in current ? current.title : current.venue} — addriano` : '—'}
          </b>
        </div>
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
    </div>
  );
}
