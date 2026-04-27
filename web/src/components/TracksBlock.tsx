import { tracks } from '../data/tracks';
import { Block } from './Block';
import { Player } from './Player';
import { usePlayer } from './Player/context';

export function TracksBlock() {
  const { current } = usePlayer();
  return (
    <Block>
      <Block.Header num="01" title="TRACKS" jp="トラック · ORIGINAL OUTPUT" />
      <Block.Body>
        <div className="border-t-[1.5px] border-ink">
          {tracks.map((t, i) => {
            const active = current?.id === t.id;
            return (
              <div key={t.id} className={`grid grid-cols-[28px_1fr_auto_auto_28px_28px] gap-3 items-center py-2.5 px-1 border-b border-ink text-xs ${active ? 'bg-lime' : ''}`}>
                <span className="font-display">A{i + 1}</span>
                <span>
                  <b className="font-display text-sm block">{t.title}</b>
                  <span className="text-ink-2 text-[11px]">{t.year}{t.label ? ` · ${t.label}` : ''}</span>
                </span>
                <span className="text-[11px]">{t.bpm} BPM · {t.musicalKey}</span>
                <span className="text-[11px] tabular-nums">{t.duration}</span>
                {t.downloadable ? (
                  <a
                    href={`${t.embedUrl}/download`}
                    className="w-5 h-5 border-[1.5px] border-ink rounded-full grid place-items-center bg-paper hover:bg-lime transition-colors text-[11px]"
                    aria-label={`download ${t.title}`}
                  >
                    ↓
                  </a>
                ) : <span />}
                <Player.Button item={t} />
              </div>
            );
          })}
        </div>
        <Block.Photo src="/photos/tracks.jpg" label="Tracks · Mood" aspect="aspect-[4/5]" objectPosition="80% center" />
      </Block.Body>
    </Block>
  );
}
