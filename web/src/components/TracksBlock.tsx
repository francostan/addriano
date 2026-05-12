import { Fragment } from 'react';
import { releases, releaseAsTrack } from '../data/tracks';
import type { Release, Track } from '../types';
import { Block } from './Block';
import { Player } from './Player';
import { usePlayer } from './Player/context';
import { formatMs } from './Player/format';

function SideHeader({ r, active }: { r: Release; active: boolean }) {
  const { play, pause } = usePlayer();
  const playable = r.embedUrl ? releaseAsTrack(r) : null;

  return (
    <div className={`grid grid-cols-[28px_1fr_auto] gap-3 items-center py-2 px-1 border-t-[1.5px] border-b border-ink ${active ? 'bg-lime' : ''}`}>
      <span className="font-display text-[13px]">{r.side}</span>
      <span className="font-display text-[11px] tracking-[0.16em]">
        <span className={r.kind === 'singles' ? 'uppercase' : ''}>{r.title}</span>
        {r.kind !== 'singles' && (
          <span className="text-ink-2 ml-2 tracking-normal">· {r.kind} · {r.year}</span>
        )}
      </span>
      {playable ? (
        <button
          type="button"
          onClick={() => (active ? pause() : play(playable))}
          className={`inline-flex items-center gap-1.5 border-[1.5px] border-ink px-2 py-0.5 text-[10px] tracking-[0.14em] uppercase ${active ? 'bg-paper' : 'bg-paper hover:bg-lime'} transition-colors`}
          aria-label={active ? `pause ${r.title}` : `play full ${r.title}`}
        >
          {active ? '❚❚' : '▶'} ALL
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

function Row({ t, pos, showDownload, parentActive }: { t: Track; pos: string; showDownload: boolean; parentActive: boolean }) {
  const { current, durations } = usePlayer();
  const active = current?.id === t.id || parentActive;
  return (
    <div className={`grid grid-cols-[28px_1fr_auto_28px_28px] gap-3 items-center py-2.5 px-1 border-b border-ink text-xs ${active ? 'bg-lime' : ''}`}>
      <span className="font-display">{pos}</span>
      <span>
        <b className="font-display text-sm block">{t.title}</b>
        <span className="text-ink-2 text-[11px]">{t.year}</span>
      </span>
      <span className="text-[11px] tabular-nums">{durations[t.embedUrl] ? formatMs(durations[t.embedUrl]) : (t.duration || '--:--')}</span>
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
            const releaseActive = !!r.embedUrl && current?.id === r.id;
            return (
              <Fragment key={r.id}>
                <SideHeader r={r} active={releaseActive} />
                {r.tracks.map((t, i) => (
                  <Row
                    key={t.id}
                    t={t}
                    pos={`${r.side}${i + 1}`}
                    showDownload={r.kind === 'singles'}
                    parentActive={releaseActive}
                  />
                ))}
              </Fragment>
            );
          })}
        </div>
        <Block.Photo src="/photos/tracks.webp" aspect="aspect-[4/5]" objectPosition="80% center" />
      </Block.Body>
    </Block>
  );
}
