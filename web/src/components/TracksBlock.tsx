import { releases, releaseAsTrack } from '../data/tracks';
import type { Release, Track } from '../types';
import { Block } from './Block';
import { Player } from './Player';
import { usePlayer } from './Player/context';
import { formatMs } from './Player/format';

function SideHeader({ r, headerActive, isCurrentSet }: { r: Release; headerActive: boolean; isCurrentSet: boolean }) {
  const { isPlaying, play, pause } = usePlayer();
  const playable = r.embedUrl ? releaseAsTrack(r) : null;
  const setPlaying = isCurrentSet && isPlaying;

  return (
    <div className={`grid grid-cols-[28px_1fr_auto] gap-3 items-center py-2 px-1 group-rule ${headerActive ? 'bg-lime' : ''}`}>
      <span className="font-display text-[13px]">{r.side}</span>
      <span className="font-display text-[11px] tracking-[0.16em]">
        {r.title}
        {r.kind !== 'singles' && (
          <span className={`ml-2 tracking-normal ${headerActive ? 'text-ink' : 'text-ink-2'}`}>· {r.kind} · {r.year}</span>
        )}
      </span>
      {playable ? (
        <button
          type="button"
          onClick={() => (setPlaying ? pause() : play(playable))}
          className="inline-flex items-center gap-1.5 border-[1.5px] border-ink px-2 py-0.5 text-[10px] tracking-[0.14em] uppercase bg-paper hover:bg-lime transition-colors"
          aria-label={setPlaying ? `pause ${r.title}` : `play full ${r.title}`}
        >
          {setPlaying ? '❚❚' : '▶'} ALL
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

function Row({ t, pos, showDownload, showYear }: { t: Track; pos: string; showDownload: boolean; showYear: boolean }) {
  const { current, durations, playingUrl } = usePlayer();
  const active = current?.id === t.id || playingUrl === t.embedUrl;
  return (
    <div className={`row grid-cols-[28px_1fr_auto_28px_28px] ${active ? 'bg-lime' : ''}`}>
      <span className="font-display text-ink-2">{pos}</span>
      <span>
        <b className="row-title block">{t.title}</b>
        {showYear && <span className="row-meta">{t.year}</span>}
      </span>
      <span className="row-meta tabular-nums">{durations[t.embedUrl] ? formatMs(durations[t.embedUrl]) : (t.duration || '--:--')}</span>
      {showDownload && t.downloadable ? (
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
}

export function TracksBlock() {
  const { current } = usePlayer();
  return (
    <Block>
      <Block.Header num="01" title="TRACKS" jp="火曜日に作った" />
      <Block.Body>
        <div>
          {releases.map(r => {
            const isCurrentSet = !!r.embedUrl && current?.id === r.id;
            const headerActive = isCurrentSet || r.tracks.some(t => t.id === current?.id);
            return (
              <div key={r.id} className="group-gap">
                <SideHeader r={r} headerActive={headerActive} isCurrentSet={isCurrentSet} />
                {r.tracks.map((t, i) => (
                  <Row
                    key={t.id}
                    t={t}
                    pos={`${i + 1}`}
                    showDownload={r.kind === 'singles'}
                    showYear={r.kind === 'singles'}
                  />
                ))}
              </div>
            );
          })}
        </div>
        <Block.Photo src="/photos/tracks.webp" aspect="aspect-[4/5]" objectPosition="80% center" />
      </Block.Body>
    </Block>
  );
}
